import { Message as KernelMessage } from '@unternet/kernel';

export type Message = KernelMessage; // & {
//   workspaceId: string;
// };

export interface Workspace {
  id: string;
  focusedProcessId: string | null;
}