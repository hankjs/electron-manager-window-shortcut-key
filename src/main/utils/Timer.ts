const noop = () => {};
export class Timer {
    #timeoutId?: NodeJS.Timeout;
    #resolve: CallableFunction = noop;
    #reject: CallableFunction = noop;

    sleep(ms: number) {
        this.#timeoutId = setTimeout(() => {
            this.#resolve();
            this.reset();
        }, ms);

        return new Promise((resolve, reject) => {
            this.#resolve = resolve;
            this.#reject = reject;
        });
    }

    clear() {
        if (this.#timeoutId) {
            clearTimeout(this.#timeoutId);
            this.#reject();
            this.reset();
        }
    }

    private reset() {
        this.#resolve = noop;
        this.#reject = noop;
        this.#timeoutId = undefined;
    }
}
