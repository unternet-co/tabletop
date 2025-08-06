import { IHTTPService, WebsiteMetadata } from './http-service';
import { JSDOM } from 'jsdom';

export class HTTPService implements IHTTPService {
  async getMetadata(url: string) {
    let metadata = {} as WebsiteMetadata;

    url = new URL(url).href;

    const response = await fetch(url);
    const html = await response.text();

    const doc = new JSDOM(html).window.document;

    const manifestLink = doc.querySelector('link[rel="manifest"]');
    const manifestHref = manifestLink?.getAttribute('href');

    if (manifestHref) {
      const baseUrl = new URL(url).origin;
      const manifestUrl = new URL(manifestHref, baseUrl).href;

      const manifestReq = await fetch(manifestUrl);
      const manifestText = await manifestReq.text();

      if (manifestText) {
        const manifest = JSON.parse(manifestText);
        metadata = manifest;

        if (manifest.icons) {
          metadata.icons = manifest.icons.map((icon) => {
            icon.src = new URL(`../${icon.src}`, manifestUrl).href;
            return icon;
          });
        }
      }
    }

    metadata.title = doc.title;

    if (!metadata.name) {
      const metaAppName = doc.querySelector('meta[name="application-name"]');
      if (metaAppName) {
        metadata.name = metaAppName.textContent ?? undefined;
      } else {
        const title = doc.querySelector('title')?.innerText;
        metadata.name = title?.split(' - ')[0].split(' | ')[0];
      }
    }

    if (!metadata.icons) {
      const faviconLink = doc.querySelector('link[rel~="icon"]');
      const faviconHref = faviconLink?.getAttribute('href');
      if (faviconHref) metadata.icons = [{
        src: new URL(faviconHref, url).href
      }];
    }

    if (!metadata.description) {
      metadata.description = doc
        .querySelector('meta[name="description"]')
        ?.getAttribute('content') || undefined;
    }

    if (!metadata.title) {
      metadata.title = metadata.name;
    }

    // const r = new Readability(doc);
    // const content = r.parse();
    // metadata.textContent = content?.textContent?.trim() || undefined;

    return metadata;
  }
}