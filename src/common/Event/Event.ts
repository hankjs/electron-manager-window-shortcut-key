type EventFn = (...args: any[]) => any

export class Event {
    /** name map events */
    #eventMap = new Map<string, Set<EventFn>>();

    emit(name: string, ...args: any[]) {
        if (!this.#eventMap.has(name)) {
            return;
        }

        const events = this.#eventMap.get(name)!;
        events.forEach(evt => evt.apply(null, args))
    }

    on(name:string, callback: EventFn) {
        let events = this.#eventMap.get(name);
        if (!events) {
            this.#eventMap.set(name, events = new Set());
        }

        events.add(callback);
    }
}