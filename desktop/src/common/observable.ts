type Observer = () => void;

export class Observable {
  private _observers = new Map<string, Observer>();

  subscribe(fn: Observer) {
    const id = crypto.randomUUID();
    this._observers.set(id, fn);
    fn();
    return () => this._observers.delete(id);
  }

  protected notify() {
    for (const fn of this._observers.values()) {
      fn();
    }
  }
}