import { createMessage, Kernel, type LanguageModel } from '@unternet/kernel';
import applyWebPageExtension, { WebPageProcess } from '../extensions/webpage';
import { isURL } from '../utils/is-url';

export class KernelService {
  public kernel: Kernel;

  constructor(
    model: LanguageModel,
  ) {

    // const openWebsiteTool = createTool({
    //   name: 'open_website',
    //   description: 'Open a website and display it to the user.',
    //   parameters: z.object({ url: z.string() }),
    //   execute: ({ url }) => {
    //     this.processService.
    //   }
    // });

    this.kernel = new Kernel({ model });
    applyWebPageExtension(this.kernel);
  }

  handleInput(text: string) {
    if (isURL(text)) {
      const process = new WebPageProcess({ url: text });
      this.kernel.spawn(process);
      return;
    }

    const msg = createMessage('input', { text });
    this.kernel.send(msg);
  }
}