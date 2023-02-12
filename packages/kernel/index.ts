// @ts-ignore
import * as kernelNApi from "./build/Release/kerneljs.node";

interface KernelNApi {
    getCurrentProcessId(): Promise<number>;

    /*
    _  __          _                         _
    | |/ /___ _   _| |__   ___   __ _ _ __ __| |
    | ' // _ \ | | | '_ \ / _ \ / _` | '__/ _` |
    | . \  __/ |_| | |_) | (_) | (_| | | | (_| |
    |_|\_\___|\__, |_.__/ \___/ \__,_|_|  \__,_|
            |___/
    */
    setKeyboardDelay(ms: number): Promise<number>;
    keyTap(key: string, modifier?: string | string[]): Promise<number>;
    keyToggle(key: string, down: string, modifier?: string | string[]): Promise<number>;
    unicodeTap(value: number): Promise<number>;
    typeString(string: string): Promise<number>;
    typeStringDelayed(string: string, cpm: number): Promise<number>;
}

export const kernel = kernelNApi as KernelNApi;

export const keys = {
    key: {
        a: "a",
        b: "b",
        c: "c",
        d: "d",
        e: "e",
        f: "f",
        g: "g",
        h: "h",
        i: "i",
        j: "j",
        k: "k",
        l: "l",
        m: "m",
        n: "n",
        o: "o",
        p: "p",
        q: "q",
        r: "r",
        s: "s",
        t: "t",
        u: "u",
        v: "v",
        w: "w",
        x: "x",
        y: "y",
        z: "z",

        "0": "0",
        "1": "1",
        "2": "2",
        "3": "3",
        "4": "4",
        "5": "5",
        "6": "6",
        "7": "7",
        "8": "8",
        "9": "9",

        backspace: "backspace",
        delete: "delete",
        enter: "enter",
        tab: "tab",
        escape: "escape",
        up: "up",
        down: "down",
        right: "right",
        left: "left",
        home: "home",
        end: "end",
        pageup: "pageup",
        pagedown: "pagedown",
        f1: "f1",
        f2: "f2",
        f3: "f3",
        f4: "f4",
        f5: "f5",
        f6: "f6",
        f7: "f7",
        f8: "f8",
        f9: "f9",
        f10: "f10",
        f11: "f11",
        f12: "f12",
        command: "command",
        alt: "alt",
        control: "control",
        shift: "shift",
        right_shift: "right_shift",
        space: "space",
        printscreen: "printscreen",
        insert: "insert",
        audio_mute: "audio_mute",
        audio_vol_down: "audio_vol_down",
        audio_vol_up: "audio_vol_up",
        audio_play: "audio_play",
        audio_stop: "audio_stop",
        audio_pause: "audio_pause",
        audio_prev: "audio_prev",
        audio_next: "audio_next",
        audio_rewind: "audio_rewind",
        audio_forward: "audio_forward",
        audio_repeat: "audio_repeat",
        audio_random: "audio_random",
        numpad_0: "numpad_0",
        numpad_1: "numpad_1",
        numpad_2: "numpad_2",
        numpad_3: "numpad_3",
        numpad_4: "numpad_4",
        numpad_5: "numpad_5",
        numpad_6: "numpad_6",
        numpad_7: "numpad_7",
        numpad_8: "numpad_8",
        numpad_9: "numpad_9",
    },
    modifier: {
        alt: "alt",
        command: "command",
        win: "win",
        control: "control",
        shift: "shift",
    },
};
