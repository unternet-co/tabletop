import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Tab } from './tab';
import './tab-bar.css';
import { icon } from '../common/icon';
import { dependencies } from '../../common/dependencies';
import { WorkspaceService } from '../../services/workspace-service';
import { WorkspaceModel } from '../../models/workspace-model';

@customElement('tab-bar')
export class TabBar extends LitElement {
  renderRoot = this;
  workspaceService = dependencies.resolve<WorkspaceService>('WorkspaceService');
  workspaceModel: WorkspaceModel;

  @state()
  tabs: Array<Tab> = [];

  @state()
  activeTabId: Tab['id'] | null = null;

  constructor() {
    super();

    this.workspaceModel = this.workspaceService.activeWorkspaceModel;

    this.workspaceModel.subscribe(() => {
      console.log('tab id', this.workspaceModel.focusedProcessId);
      this.tabs = this.workspaceModel.processes.map((process) => {
        return {
          id: process.id,
          title: process.name,
        };
      });

      this.activeTabId = this.workspaceModel.focusedProcessId;
    });
  }

  setActiveTab(id: string | null) {
    this.workspaceModel.focusedProcessId = id;
  }

  render() {
    console.log('re-renderinng', this.activeTabId, this.tabs);
    const tabs = this.tabs.map((tab) => {
      return html`
        <div
          class="tab"
          ?data-active=${this.activeTabId === tab.id}
          @mousedown=${() => this.setActiveTab(tab.id)}>
          ${tab.icon ? icon(tab.icon) : null}
          <span class="tab-title">${tab.title ?? 'Untitled'}</span>
        </div>
      `;
    });

    const button = html`
      <button
        class="toolbar-button"
        @mousedown=${() => this.setActiveTab(null)}
      >
        ${icon('home')}
      </button>
    `;

    return [button, tabs];
  }
}