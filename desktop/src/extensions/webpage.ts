import { Kernel, Process } from '@unternet/kernel';

export interface WebProcessState {
  url: string;
}

export class WebPageProcess extends Process<WebProcessState> {
  type = 'webpage';
}

export default function apply(kernel: Kernel) {
  kernel.registerProcessConstructor('webpage', WebPageProcess);
}
/*
kernel.registerResourceType('webpage', WebPageResource);
*/