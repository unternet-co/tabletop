import { render, html, css } from 'lit';
import { ProcessContainer } from '@unternet/kernel';
import { attachStyles, createEl } from '../../utils/dom';
import styles from './process-frame.css?raw';

export class ProcessFrame extends HTMLElement {
  #process?: ProcessContainer;
  #root = createEl('div', { id: 'root' });

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    attachStyles(this.shadowRoot, styles);
  }

  connectedCallback() {
    this.initialRender();
  }

  set process(process: ProcessContainer) {
    this.#process?.unmount?.();
    this.#root.innerHTML = '';
    this.#process = process;
    this.#process?.mount?.(this.#root);
  }
  get process() {
    return this.#process;
  }

  initialRender() {
    const template = html`
      ${this.#root}
    `;

    render(template, this.shadowRoot);
  }
}

customElements.define('process-frame', ProcessFrame);