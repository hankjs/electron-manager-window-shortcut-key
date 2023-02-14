export namespace IPCKernel {
    const NS = "kernel";
    
    export namespace Channel {
        export const getCurrentProcessId = `${NS}:getCurrentProcessId`;
    }
}