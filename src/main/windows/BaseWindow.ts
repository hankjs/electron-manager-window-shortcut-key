import { Event } from "electron";

export interface I_Window {
    onAttach: () => void;
    onDetach: () => void;

    // app browser-window-created
    onCreate: (e: Event) => void;
}

export abstract class BaseWindow implements I_Window {

    onAttach() {}
    onDetach() {}

    onCreate(e: Event) {}
}
