import { Table } from 'dexie';
import { KernelService } from './kernel-service';
import { Kernel, Process, ProcessSnapshot } from '@unternet/kernel';
import { Observable } from '../common/observable';

export class ProcessService extends Observable {
  private kernel: Kernel;

  constructor(
    private db: Table<ProcessSnapshot>,
    kernelService: KernelService,
  ) {
    super();
    this.kernel = kernelService.kernel;

    this.kernel.on('process.created', ({ process }) => {
      this.db.put(process.snapshot);
      this.notify();
    });

    this.kernel.on('process.changed', ({ process }) => {
      this.db.put(process.snapshot);
      this.notify();
    });
  }

  async load() {
    const snapshots = await this.db.toArray();
    for (const snapshot of snapshots) {
      this.kernel.restore(snapshot);
    }
  }

  kill(pid: string) {
    this.kernel.kill(pid);
    this.db.delete(pid);
    this.notify();
  }

  get processes() { return this.kernel.processes; }
}