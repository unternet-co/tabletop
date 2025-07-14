import { Emitter } from './utils/emitter';

export interface Workspace {
  id: string;
}

type WorkspaceServiceEvents = {
  change: undefined;
};

export class WorkspaceService extends Emitter<WorkspaceServiceEvents> {
  constructor() {
    super();
  }
}