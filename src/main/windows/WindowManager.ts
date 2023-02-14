import { I_Window } from "./BaseWindow";

export class WindowManager {
    #windows: I_Window[] = [];

    constructor() { }

    push(window: I_Window) {
        this.#windows.push(window);
        window.onAttach();
    }

    pop() {
        const window = this.#windows.pop();
        window?.onDetach();
    }
}