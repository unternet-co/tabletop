export function registerIPCService<T>(): {
  [K in keyof T]: T[K] extends (...args: infer P) => infer R
  ? (...args: P) => Promise<Awaited<R>>
  : never
} {
  return new Proxy({} as any, {
    get(target, prop: string | symbol) {
      if (typeof prop === 'string') {
        return (...args: any[]) => {
          return window.ipc.invoke(prop, args);
        };
      }
      return undefined;
    }
  });
}