import { html, LitElement } from 'lit';
import './command-bar.css';
import './command-input';
import { customElement } from 'lit/decorators.js';

@customElement('command-bar')
export class CommandBar extends LitElement {
  renderRoot = this;

  render() {
    return html`
      <command-input></command-input>
    `;
  }
}