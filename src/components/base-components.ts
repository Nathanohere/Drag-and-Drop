// Component Base Class

export default abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    renderedElement: T;
    element: U;
  
    constructor(
      templateId: string,
      renderElementId: string,
      insertAtStart: boolean,
      newElementId?: string
    ) {
      this.templateElement = document.getElementById(
        templateId
      )! as HTMLTemplateElement;
      this.renderedElement = document.getElementById(renderElementId)! as T;
  
      const nodeElement = document.importNode(this.templateElement.content, true);
  
      this.element = nodeElement.firstElementChild as U;
      if (newElementId) {
        this.element.id = newElementId;
      }
      this.attach(insertAtStart);
    }
  
    private attach(insertAtBeginning: boolean) {
      this.renderedElement.insertAdjacentElement(
        insertAtBeginning ? 'afterbegin' : 'beforeend',
        this.element
      );
    }
  
    abstract configure(): void;
    abstract renderContent(): void;
  }
  