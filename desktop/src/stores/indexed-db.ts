import { Dexie, Table } from 'dexie';
import { Workspace } from '../workspaces';

export class IndexedDB extends Dexie {
  workspaces!: Table<Workspace, string>;

  constructor() {
    super('DB');

    this.version(1).stores({
      workspaces: 'id',
      messages: 'id,workspaceId',
    });
  }
}

// export class IndexedDB extends Dexie {
//   workspaces!: Table<WorkspaceRecord, string>;
//   messages!: Table<MessageRecord, string>;
//   processes!: Table<ProcessSnapshot, string>;
//   resources!: Table<Resource, string>;

//   constructor() {
//     super('DB');

//     this.version(1).stores({
//       workspaces: 'id',
//       messages: 'id,workspaceId,active',
//       processes: 'pid,workspaceId',
//       resources: 'uri',
//     });
//   }
// }

export const db = new IndexedDB();
