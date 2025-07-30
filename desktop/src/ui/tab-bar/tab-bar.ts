import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Tab } from './tab';
import './tab-bar.css';
import { icon } from '../common/icon';

@customElement('tab-bar')
export class TabBar extends LitElement {
  renderRoot = this;

  @state()
  tabs: Array<Tab> = [
    {
      id: "1234",
      title: "My Cool Tab",
    },
    {
      id: "1235",
      title: "My Cool Tab",
    }
  ];

  @state()
  activeTabId: Tab['id'] | null = null;

  render() {
    const tabs = this.tabs.map((tab) => {
      return html`
        <div
          class="tab"
          ?data-active=${this.activeTabId === tab.id}
          @mousedown=${() => this.activeTabId = tab.id}>
          ${tab.icon ? icon(tab.icon) : null}
          <span class="tab-title">${tab.title}</span>
        </div>
      `;
    });

    const button = html`
      <button
        class="toolbar-button"
        @mousedown=${() => this.activeTabId = null}
      >
        ${icon('home')}
      </button>
    `;

    return [button, tabs];
  }
}