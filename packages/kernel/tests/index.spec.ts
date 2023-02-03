import * as addon from "../index.js";

describe("Kernel32", () => {

    it("getCurrentProcessId", () => {
        const id = addon.getCurrentProcessId();
        expect(typeof id).toBe("number");
    })
});
