import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../home-screen/home-screen';
import './workbench-view.css';
import { dependencies } from '../../common/dependencies';
import { WorkspaceService } from '../../services/workspace-service';
import { WorkspaceModel } from '../../models/workspace-model';
import './process-frame';

@customElement('workbench-view')
export class WorkbenchView extends LitElement {
  renderRoot = this;
  workspaceService = dependencies.resolve<WorkspaceService>('WorkspaceService');
  workspaceModel: WorkspaceModel;

  constructor() {
    super();
    this.workspaceModel = this.workspaceService.activeWorkspaceModel;
    this.workspaceModel.subscribe(() => this.requestUpdate());
  }

  render() {
    if (this.workspaceModel.focusedProcessId) {
      const process = this.workspaceModel.processes.filter((p) => {
        return p.id === this.workspaceModel.focusedProcessId;
      }).at(0);

      return html`<process-frame .process=${process}></process-frame>`;
    } else {
      return html`
        <home-screen></home-screen>
      `;
    }
  }
}