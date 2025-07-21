import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import './app-root.css';
import './top-bar/top-bar';
import './workbench/workbench-view';
import './command-bar/command-bar';

@customElement('app-root')
export class AppRoot extends LitElement {
  renderRoot = this;

  render() {
    return html`
      <top-bar></top-bar>
      <workbench-view></workbench-view>
      <command-bar></command-bar>
    `;
  }
}
