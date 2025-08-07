import { createMessage, Kernel, type LanguageModel } from '@unternet/kernel';
import applyWebPageExtension, { WebPageProcess } from '../extensions/webpage';
import { url } from '../utils/is-url';
import { Underline } from 'lucide';

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
    const parsedUrl = url(text);
    if (parsedUrl) {
      const process = new WebPageProcess();
      process.loadURL(parsedUrl);
      this.kernel.spawn(process);
      return;
    }

    const msg = createMessage('input', { text });
    this.kernel.send(msg);
  }
}