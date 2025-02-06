import { DragTarget} from '../models/drag-drop';
import {Project, projectStatus} from '../models/project';
import Component from './base-components';
import {autobind} from '../decorators/autobind';
import {projectState} from '../state/project-state';
import { ProjectItem } from './project-item';

// ProjectList CLass
export class DisplayList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignedProject: Project[];

  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false, `${type}-projects`);
    this.assignedProject = [];

    this.configure();
    this.renderContent();
  }
  @autobind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault();
      const listEL = this.element.querySelector('ul')!;
      listEL.classList.add('droppable');
    }
  }

  @autobind
  dropHandler(event: DragEvent) {
    const prjId = event.dataTransfer!.getData('text/plain');
    projectState.moveProject(
      prjId,
      this.type === 'active' ? projectStatus.Active : projectStatus.Finished
    );
  }

  @autobind
  dragLeaveHandler(_: DragEvent) {
    const listEl = this.element.querySelector('ul')!;
    listEl.classList.remove('droppable');
  }

  configure() {
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);
    this.element.addEventListener('drop', this.dropHandler);
    projectState.addListener((projects: Project[]) => {
      const relevantProject = projects.filter((prj) => {
        if (this.type === 'active') {
          return prj.status === projectStatus.Active;
        }
        return prj.status === projectStatus.Finished;
      });
      this.assignedProject = relevantProject;
      this.renderProject();
    });
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent =
      this.type.toUpperCase() + 'PROJECTS';
  }

  private renderProject() {
    const listEL = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    listEL.innerHTML = '';
    for (const prjItem of this.assignedProject) {
      new ProjectItem(this.element.querySelector('ul')!.id, prjItem);
    }
  }
}