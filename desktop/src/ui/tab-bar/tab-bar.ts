import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Tab } from './tab';
import './tab-bar.css';
import '../common/icon';
import { dependencies } from '../../common/dependencies';
import { WorkspaceService } from '../../services/workspace-service';
import { WorkspaceModel } from '../../models/workspace-model';
import { ProcessService } from '../../services/process-service';

@customElement('tab-bar')
export class TabBar extends LitElement {
  renderRoot = this;
  workspaceService = dependencies.resolve<WorkspaceService>('WorkspaceService');
  workspaceModel = this.workspaceService.activeWorkspaceModel;
  processService = dependencies.resolve<ProcessService>('ProcessService');

  @state()
  tabs: Array<Tab> = [];

  @state()
  activeTabId: Tab['id'] | null = null;

  constructor() {
    super();

    this.workspaceModel.subscribe(() => {
      this.tabs = this.workspaceModel.processes.map((process) => {
        return {
          id: process.id,
          title: process.name,
          icon: process.icons?.[0],
        };
      });

      this.activeTabId = this.workspaceModel.focusedProcessId;
    });
  }

  setActiveTab(id: string | null) {
    this.workspaceModel.focusedProcessId = id;
  }

  closeTab(id: string) {
    this.processService.kill(id);
  }

  render() {
    const tabs = this.tabs.map((tab) => {
      const iconElement = tab.icon
        ? html`<img src="${tab.icon.src}" class="tab-icon" alt="" />`
        : '';

      return html`
        <div
          class="tab pressable"
          ?data-active=${this.activeTabId === tab.id}
          @mousedown=${() => this.setActiveTab(tab.id)}>
          
          ${iconElement}
          <span class="tab-title">${tab.title ?? 'Untitled'}</span>
          <un-icon icon=${'close'} class="close-icon pressable" @mousedown=${() => this.closeTab(tab.id)}></un-icon>
        </div>
      `;
    });

    const button = html`
      <button
        class="toolbar-button pressable"
        @mousedown=${() => this.setActiveTab(null)}
      >
        <un-icon .icon=${'home'}></un-icon>
      </button>
    `;

    return [button, tabs];
  }
}