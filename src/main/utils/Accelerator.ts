export namespace Accelerator {
    export enum Modifier {
        Command = "Command", // (or Cmd for short)
        Cmd = "Cmd",
        Control = "Control", // (or Ctrl for short)
        Ctrl = "Ctrl",
        CommandOrControl = "CommandOrControl", // (or CmdOrCtrl for short)
        CmdOrCtrl = "CmdOrCtrl",
        Alt = "Alt",
        Option = "Option",
        AltGr = "AltGr",
        Shift = "Shift",
        Super = "Super",
        Meta = "Meta",
    }

    export enum Key {
        Key0 = "0",
        Key1 = "1",
        Key2 = "2",
        Key3 = "3",
        Key4 = "4",
        Key5 = "5",
        Key6 = "6",
        Key7 = "7",
        Key8 = "8",
        Key9 = "9",

        KeyA = "A",
        KeyB = "B",
        KeyC = "C",
        KeyD = "D",
        KeyE = "E",
        KeyF = "F",
        KeyG = "G",
        KeyH = "H",
        KeyI = "I",
        KeyJ = "J",
        KeyK = "K",
        KeyL = "L",
        KeyM = "M",
        KeyN = "N",
        KeyO = "O",
        KeyP = "P",
        KeyQ = "Q",
        KeyR = "R",
        KeyS = "S",
        KeyT = "T",
        KeyU = "U",
        KeyV = "V",
        KeyW = "W",
        KeyX = "X",
        KeyY = "Y",
        KeyZ = "Z",

        "Key`" = "`",
        "Key~" = "~",
        "Key!" = "!",
        "Key@" = "@",
        "Key#" = "#",
        "Key$" = "$",
        "Key%" = "%",
        "Key^" = "^",
        "Key&" = "&",
        "Key*" = "*",
        "Key(" = "(",
        "Key)" = ")",
        "Key-" = "-",
        "Key_" = "_",
        "Key=" = "=",
        "Key+" = "Plus",
        "Key[" = "[",
        "Key{" = "{",
        "Key]" = "]",
        "Key\\" = "\\",
        "Key|" = "|",
        "Key;" = ";",
        "Key:" = ":",
        "Key'" = "'",
        'Key"' = '"',
        "Key," = ",",
        "Key<" = "<",
        "Key." = ".",
        "Key>" = ">",
        "Key/" = "/",
        "Key?" = "?",

        Plus = "Plus",
        Space = "Space",
        Tab = "Tab",
        Capslock = "Capslock",
        Numlock = "Numlock",
        Scrolllock = "Scrolllock",
        Backspace = "Backspace",
        Delete = "Delete",
        Insert = "Insert",
        Return = "Return", // (or Enter as alias)
        Enter = Return,
        Up = "Up",
        Down = "Down",
        Left = "Left",
        Right = "Right",
        Home = "Home",
        PageUp = "PageUp",
        PageDown = "PageDown",
        Escape = "Escape", // (or Esc for short)
        Esc = Escape,

        // Volume
        VolumeUp = "VolumeUp",
        VolumeDown = "VolumeDown",
        VolumeMute = "VolumeMute",

        // Media
        MediaNextTrack = "MediaNextTrack",
        MediaPreviousTrack = "MediaPreviousTrack",
        MediaStop = "MediaStop ",
        MediaPlayPause = "MediaPlayPause",

        PrintScreen = "PrintScreen",

        Num0 = "Num0",
        Num1 = "Num1",
        Num2 = "Num2",
        Num3 = "Num3",
        Num4 = "Num4",
        Num5 = "Num5",
        Num6 = "Num6",
        Num7 = "Num7",
        Num8 = "Num8",
        Num9 = "Num9",
        NumDec = "numdec", // decimal key
        NumAdd = "numadd", // numpad + key
        NumSub = "numsub", // numpad - key
        NumMult = "nummult", // numpad * key
        NumDiv = "numdiv", // numpad / key
    }

    export type Pattern = `${Modifier}` | `${Key}` | `${Modifier}+${Key}` | `${Modifier}+${Modifier}+${Key}`
}