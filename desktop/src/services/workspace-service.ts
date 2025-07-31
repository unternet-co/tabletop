import { Table } from 'dexie';
import { Workspace } from '../types';
import { Observable } from '../common/observable';
import { ulid } from 'ulid';
import { WorkspaceModel } from '../models/workspace-model';

export class WorkspaceService extends Observable {
  private _workspaces = new Map<Workspace['id'], Workspace>();
  activeWorkspaceModel?: WorkspaceModel;

  constructor(
    private db: Table<Workspace>,
  ) {
    super();
  }

  async load() {
    const savedWorkspaces = await this.db.toArray();
    for (const ws of savedWorkspaces) {
      this._workspaces.set(ws.id, ws);
    }
    this.setActiveWorkspace(savedWorkspaces[0].id);

    if (!savedWorkspaces.length) await this.create();
  }

  async create() {
    const ws: Workspace = {
      id: ulid(),
      focusedProcessId: null,
    };
    this._workspaces.set(ws.id, ws);
    this.setActiveWorkspace(ws.id);
    await this.db.add(ws);
  }

  setActiveWorkspace(id: string) {
    this.activeWorkspaceModel = new WorkspaceModel(id);
  }

  updateWorkspace(id: Workspace['id'], updates: Partial<Workspace>) {
    let ws = this._workspaces.get(id);
    ws = { ...ws, ...updates };
    this._workspaces.set(id, ws);
    this.db.put(ws);
    this.notify();
  }

  get(id: Workspace['id']) {
    return this._workspaces.get(id);
  }
}