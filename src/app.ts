// Code goes here!

import { DisplayInput } from './components/project-input';
import { DisplayList } from './components/project-list';

// Project State Management
// type Listener<T> = (items: T[]) => void;

// class State<T> {
//   protected listeners: Listener<T>[] = [];

//   addListener(listenerFx: Listener<T>) {
//     this.listeners.push(listenerFx);
//   }
// }

// class ProjectState extends State<Project> {
//   private projects: Project[] = [];
//   private static instance: ProjectState;

//   private constructor() {
//     super();
//   }

//   static getInstance() {
//     if (this.instance) {
//       return this.instance;
//     }

//     this.instance = new ProjectState();
//     return this.instance;
//   }

//   addProjects(title: string, description: string, numOfPeople: number) {
//     const newProject = new Project(
//       Math.random().toString(),
//       title,
//       description,
//       numOfPeople,
//       projectStatus.Active
//     );
//     this.projects.push(newProject);
//     this.updateListeners();
//   }

//   moveProject(projectId: string, newStatus: projectStatus) {
//     const project = this.projects.find((prj) => prj.id === projectId);
//     if (project && project.status !== newStatus) {
//       project.status = newStatus;
//       this.updateListeners();
//     }
//   }

//   private updateListeners() {
//     for (const listenerFn of this.listeners) {
//       listenerFn(this.projects.slice());
//     }
//   }
// }

// const projectState = ProjectState.getInstance();

// ProjectItem class

new DisplayInput();
new DisplayList('active');
new DisplayList('finished');
