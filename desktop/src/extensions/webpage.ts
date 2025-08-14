import { Kernel, Process } from '@unternet/kernel';
import { dependencies } from '../common/dependencies';
import { IHTTPService } from '../services/http-service.shared';
import { ResourceIcon } from '@unternet/kernel';
import { WebviewTag } from 'electron';
import { createEl } from '../utils/dom';

export interface WebProcessSnapshot {
  url: string;
  name: string;
  title: string;
  icons: ResourceIcon[];
  textContent: string;
}

export class WebPageProcess extends Process {
  static type = 'webpage';
  url: string;
  textContent: string;
  webview: WebviewTag = createEl('webview');
  httpService = dependencies.resolve<IHTTPService>('HTTPService');

  static fromSnapshot(snapshot: WebProcessSnapshot) {
    const process = new WebPageProcess();
    // Set the cached values from the snapshot instantly
    process.name = snapshot.name;
    process.title = snapshot.title;
    process.icons = snapshot.icons;
    // Load the updated values asynchronously
    process.loadURL(snapshot.url);
    return process;
  }

  static fromURL(url: string) {
    const process = new WebPageProcess();
    process.loadURL(url);
    return process;
  }

  async loadURL(url: string) {
    this.url = url;
    this.webview.src = url;
    this.webview.style.width = '100%';
    this.webview.style.height = '100%';
    const metadata = await this.httpService.getMetadata(url);
    this.name = metadata.name;
    this.title = metadata.title;
    this.icons = metadata.icons;
    this.notifyChange();
  }

  mount(root: HTMLElement) {
    root.appendChild(this.webview);
  }

  get snapshot(): WebProcessSnapshot {
    return {
      url: this.url,
      name: this.name,
      title: this.title,
      icons: this.icons,
      textContent: this.textContent,
    };
  }
}

export default function apply(kernel: Kernel) {
  kernel.registerProcessConstructor(WebPageProcess);
}