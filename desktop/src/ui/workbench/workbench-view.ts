import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../home-screen/home-screen';
import './workbench-view.css';

@customElement('workbench-view')
export class WorkbenchView extends LitElement {
  renderRoot = this;

  render() {
    return html`
      <home-screen></home-screen>
    `;
  }
}