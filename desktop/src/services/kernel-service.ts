import { createMessage, createTool, Kernel, type LanguageModel } from '@unternet/kernel';
import applyWebPageExtension, { WebPageProcess } from '../extensions/webpage';
import { validateURL } from '../utils/validate-url';
import { z } from 'zod';

export class KernelService {
  public kernel: Kernel;

  constructor(
    model: LanguageModel,
  ) {

    const tools = [createTool({
      name: 'open_website',
      description: 'Open a website and display it to the user.',
      parameters: z.object({ url: z.string() }),
      execute: ({ url }) => WebPageProcess.fromURL(url),
    })];

    const instructions = `If the user wants a simple factual lookup, or enters some keywords like a search query, show them a google search page querying this, and then also respond directly to answer.`;

    this.kernel = new Kernel({ model, tools, instructions });
    applyWebPageExtension(this.kernel);
  }

  async handleInput(text: string) {
    const parsedUrl = validateURL(text);
    if (parsedUrl) {
      const process = WebPageProcess.fromURL(parsedUrl);
      this.kernel.spawn(process);
      return;
    }

    const msg = createMessage('input', { text });
    this.kernel.send(msg);
  }
}