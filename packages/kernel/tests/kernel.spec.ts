import { test, expect } from "@playwright/test";
import * as addon from "../index.js";

test.describe("Kernel", () => {

    test("getCurrentProcessId", () => {
        const id = addon.kernel.getCurrentProcessId();
        expect(typeof id).toBe("number");
    })
});
