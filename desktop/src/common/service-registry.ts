export interface ServiceDefinition<T = any> {
  name: string;
  mainImplementation?: new (...args: any[]) => T;
  rendererProxy?: boolean; // Whether to create IPC proxy in renderer
  dependencies?: string[]; // Dependencies from DI container
}

export class ServiceRegistry {
  private services = new Map<string, ServiceDefinition>();

  register<T>(definition: ServiceDefinition<T>) {
    this.services.set(definition.name, definition);
    return this;
  }

  getServices() {
    return Array.from(this.services.values());
  }

  getService(name: string) {
    return this.services.get(name);
  }
}

// Shared service registry
export const serviceRegistry = new ServiceRegistry();
