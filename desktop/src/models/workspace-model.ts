import { MessageDelta, ProcessContainer } from '@unternet/kernel';
import { dependencies } from '../common/dependencies';
import { MessageService } from '../services/message-service';
import { ProcessService } from '../services/process-service';
import { WorkspaceService } from '../services/workspace-service';
import { Message, Workspace } from '../types';
import { Observable } from '../common/observable';

export class WorkspaceModel extends Observable implements Workspace {
  workspaceService = dependencies.resolve<WorkspaceService>('WorkspaceService');
  messageService = dependencies.resolve<MessageService>('MessageService');
  processService = dependencies.resolve<ProcessService>('ProcessService');

  id: string;
  messages: Message[] = [];
  processes: ProcessContainer[] = [];

  private _focusedProcessId: string | null = null;
  get focusedProcessId() { return this._focusedProcessId; }
  set focusedProcessId(id: string | null) {
    this.workspaceService.updateWorkspace(this.id, {
      focusedProcessId: id
    });
  }

  constructor(
    id: Workspace['id'],
  ) {
    super();
    this.id = id;

    this.workspaceService.subscribe(() => {
      const ws = this.workspaceService.get(this.id);
      this._focusedProcessId = ws.focusedProcessId;
      console.log(this._focusedProcessId);
      this.notify();
    });

    this.messageService.subscribe(() => {
      this.messages = this.messageService.messages;
      this.notify();
    });

    this.processService.subscribe(() => {
      this.processes = this.processService.processes;
      this.notify();
    });
  };

}