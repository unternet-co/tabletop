import { html, LitElement } from 'lit';
import './command-input.css';
import { customElement } from 'lit/decorators.js';

@customElement('command-input')
export class CommandInput extends LitElement {
  renderRoot = this;

  render() {
    return html`
      <input type="text" placeholder="Search or type a command..." />
    `;
  }
}