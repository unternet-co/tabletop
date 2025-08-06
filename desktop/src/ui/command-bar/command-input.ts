import { html, LitElement } from 'lit';
import './command-input.css';
import { customElement, property } from 'lit/decorators.js';
import { dependencies } from '../../common/dependencies';
import { KernelService } from '../../services/kernel-service';
import { createMessage, InputMessage } from '@unternet/kernel';

@customElement('command-input')
export class CommandInput extends LitElement {
  renderRoot = this;
  kernelService: KernelService;

  constructor() {
    super();
    this.kernelService = dependencies.resolve('KernelService');
  }

  handleKeyDown = (e: KeyboardEvent) => {
    const target = e.target as HTMLInputElement;

    if (e.key === 'Enter') {
      this.kernelService.handleInput(target.value);
      target.value = '';
    }
  };

  render() {
    return html`
      <input
        type="text"
        placeholder="Search or type a command..."
        @keydown=${this.handleKeyDown}
      />
    `;
  }
}