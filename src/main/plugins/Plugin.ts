export interface I_Plugin {
    onAttach(): void;
    onDetach(): void;
}

export abstract class Plugin implements I_Plugin {
    abstract onAttach(): void;
    abstract onDetach(): void;
}
