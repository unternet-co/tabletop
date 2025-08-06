import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import './app-root.css';
import './tab-bar/tab-bar';
import './workbench/workbench-view';
import './command-bar/command-bar';
import './history/history-view';

@customElement('app-root')
export class AppRoot extends LitElement {
  renderRoot = this;

  render() {
    return html`
      <div class="top-bar">
        <tab-bar></tab-bar>
      </div>
      <div class="main">
        <workbench-view></workbench-view>
        <history-view></history-view>
      </div>
      <command-bar></command-bar>
    `;
  }
}
