import { KernelMessage } from '@unternet/kernel';

export type Message = KernelMessage & {
  workspaceId: string;
};