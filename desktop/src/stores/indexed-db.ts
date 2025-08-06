import { Dexie, Table } from 'dexie';
import { Message, ProcessSnapshot } from '@unternet/kernel';
import { Workspace } from '../types';

export class IndexedDB extends Dexie {
  messages!: Table<Message, Message['id']>;
  processes!: Table<ProcessSnapshot, ProcessSnapshot['id']>;
  workspaces!: Table<Workspace, Workspace['id']>;

  constructor() {
    super('Tabletop DB');

    this.version(1).stores({
      messages: 'id',
      processes: 'id',
      workspaces: 'id',
    });
  }
}
