import { Dexie, Table } from 'dexie';
import { Message } from '@unternet/kernel';

export class IndexedDB extends Dexie {
  messages!: Table<Message, Message['id']>;

  constructor() {
    super('DB');

    this.version(1).stores({
      messages: 'id',
    });
  }
}
