export type ElementParams = {
  tag: string;
  className?: string[];
  textContent?: string;
  callback?: () => void;
  children?: ElementCreator[];
  attribute?: { name: string; value: string };
};

export class ElementCreator {
  element: HTMLElement;

  constructor(params: ElementParams) {
    this.element = this.createElement(params);
  }

  createElement(params: ElementParams) {
    this.element = document.createElement(params.tag);
    if (params.className) this.setCssClasses(params?.className);
    if (params.textContent) this.setTextContent(params.textContent);
    if (params.callback) this.setCallback(params.callback);
    if (params.attribute) this.setAttribute(params.attribute);
    if (params.children) {
      params.children.forEach((child) => {
        this.addInnerElement(child);
      });
    }
    return this.element;
  }

  getElement() {
    return this.element;
  }

  setCssClasses(cssClasses: string[]) {
    cssClasses.map((cssClass) => this.element.classList.add(cssClass));
  }

  setTextContent(text = '') {
    this.element.textContent = text;
  }

  setAttribute(atr: { name: string; value: string }) {
    this.element.setAttribute(atr.name, atr.value);
  }

  setCallback(callback: () => void) {
    if (typeof callback === 'function') {
      this.element.addEventListener('click', () => callback());
    }
  }

  addInnerElement(element: ElementCreator) {
    if (element instanceof ElementCreator) {
      this.element.append(element.getElement());
    } else {
      this.element.append(element);
    }
  }
}
