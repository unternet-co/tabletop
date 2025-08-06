import { ResourceIcon } from '@unternet/kernel/dist/resources';

export interface WebsiteMetadata {
  title?: string;
  name?: string;
  short_name?: string;
  description?: string;
  icons?: ResourceIcon[];
  textContent?: string;
}

export interface IHTTPService {
  getMetadata(url: string): Promise<WebsiteMetadata>;
}