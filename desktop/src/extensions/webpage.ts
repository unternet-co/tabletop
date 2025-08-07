import { Kernel, Process } from '@unternet/kernel';
import { dependencies } from '../common/dependencies';
import { IHTTPService } from '../services/http-service';
import { ResourceIcon } from '@unternet/kernel/dist/resources';

export interface WebProcessState {
  url: string;
  title: string;
  icons: ResourceIcon[];
}

export class WebPageProcess extends Process<WebProcessState> {
  type = 'webpage';
  httpService = dependencies.resolve<IHTTPService>('HTTPService');

  async loadURL(url: string) {
    const metadata = await this.httpService.getMetadata(url);
    this.name = metadata.title;
    this.icons = metadata.icons;
    this.emit('change');
  }
}

export default function apply(kernel: Kernel) {
  kernel.registerProcessConstructor('webpage', WebPageProcess);
}
/*
kernel.registerResourceType('webpage', WebPageResource);
*/