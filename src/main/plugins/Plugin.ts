export type Install = (...options: any[]) => void;

export abstract class Plugin {
    abstract onAttach(): void;
    abstract onDetach(): void;

    /** need implemented. */
    static install(...options: any[]) {
        throw new Error("Method not implemented.");
    }
}
