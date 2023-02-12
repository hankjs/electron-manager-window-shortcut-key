#include <string>
#include <napi.h>
#include "processInfo.h"
#include "keypress.h"
#include "microsleep.h"

#define JSError(env, str)                                        \
    Napi::TypeError::New(env, str).ThrowAsJavaScriptException(); \
    return Napi::Number::New(env, 0)

// Global delays.
int mouseDelay = 10;
int keyboardDelay = 10;

Napi::Number _GetCurrentProcessId(const Napi::CallbackInfo &info)
{
    auto env = info.Env();
    auto id = N_GetID();
    auto result = Napi::Number::New(env, id);
    return result;
}

/*
 _  __          _                         _
| |/ /___ _   _| |__   ___   __ _ _ __ __| |
| ' // _ \ | | | '_ \ / _ \ / _` | '__/ _` |
| . \  __/ |_| | |_) | (_) | (_| | | | (_| |
|_|\_\___|\__, |_.__/ \___/ \__,_|_|  \__,_|
          |___/
*/
struct KeyNames
{
    const char *name;
    MMKeyCode key;
};

static KeyNames key_names[] =
    {
        {"backspace", K_BACKSPACE},
        {"delete", K_DELETE},
        {"enter", K_RETURN},
        {"tab", K_TAB},
        {"escape", K_ESCAPE},
        {"up", K_UP},
        {"down", K_DOWN},
        {"right", K_RIGHT},
        {"left", K_LEFT},
        {"home", K_HOME},
        {"end", K_END},
        {"pageup", K_PAGEUP},
        {"pagedown", K_PAGEDOWN},
        {"f1", K_F1},
        {"f2", K_F2},
        {"f3", K_F3},
        {"f4", K_F4},
        {"f5", K_F5},
        {"f6", K_F6},
        {"f7", K_F7},
        {"f8", K_F8},
        {"f9", K_F9},
        {"f10", K_F10},
        {"f11", K_F11},
        {"f12", K_F12},
        {"f13", K_F13},
        {"f14", K_F14},
        {"f15", K_F15},
        {"f16", K_F16},
        {"f17", K_F17},
        {"f18", K_F18},
        {"f19", K_F19},
        {"f20", K_F20},
        {"f21", K_F21},
        {"f22", K_F22},
        {"f23", K_F23},
        {"f24", K_F24},
        {"capslock", K_CAPSLOCK},
        {"command", K_META},
        {"alt", K_ALT},
        {"right_alt", K_RIGHT_ALT},
        {"control", K_CONTROL},
        {"left_control", K_LEFT_CONTROL},
        {"right_control", K_RIGHT_CONTROL},
        {"shift", K_SHIFT},
        {"right_shift", K_RIGHTSHIFT},
        {"space", K_SPACE},
        {"printscreen", K_PRINTSCREEN},
        {"insert", K_INSERT},
        {"menu", K_MENU},

        {"audio_mute", K_AUDIO_VOLUME_MUTE},
        {"audio_vol_down", K_AUDIO_VOLUME_DOWN},
        {"audio_vol_up", K_AUDIO_VOLUME_UP},
        {"audio_play", K_AUDIO_PLAY},
        {"audio_stop", K_AUDIO_STOP},
        {"audio_pause", K_AUDIO_PAUSE},
        {"audio_prev", K_AUDIO_PREV},
        {"audio_next", K_AUDIO_NEXT},
        {"audio_rewind", K_AUDIO_REWIND},
        {"audio_forward", K_AUDIO_FORWARD},
        {"audio_repeat", K_AUDIO_REPEAT},
        {"audio_random", K_AUDIO_RANDOM},

        {"numpad_lock", K_NUMPAD_LOCK},
        {"numpad_0", K_NUMPAD_0},
        {"numpad_0", K_NUMPAD_0},
        {"numpad_1", K_NUMPAD_1},
        {"numpad_2", K_NUMPAD_2},
        {"numpad_3", K_NUMPAD_3},
        {"numpad_4", K_NUMPAD_4},
        {"numpad_5", K_NUMPAD_5},
        {"numpad_6", K_NUMPAD_6},
        {"numpad_7", K_NUMPAD_7},
        {"numpad_8", K_NUMPAD_8},
        {"numpad_9", K_NUMPAD_9},
        {"numpad_+", K_NUMPAD_PLUS},
        {"numpad_-", K_NUMPAD_MINUS},
        {"numpad_*", K_NUMPAD_MULTIPLY},
        {"numpad_/", K_NUMPAD_DIVIDE},
        {"numpad_.", K_NUMPAD_DECIMAL},

        {"lights_mon_up", K_LIGHTS_MON_UP},
        {"lights_mon_down", K_LIGHTS_MON_DOWN},
        {"lights_kbd_toggle", K_LIGHTS_KBD_TOGGLE},
        {"lights_kbd_up", K_LIGHTS_KBD_UP},
        {"lights_kbd_down", K_LIGHTS_KBD_DOWN},

        {NULL, K_NOT_A_KEY} /* end marker */
};

int CheckKeyCodes(char *k, MMKeyCode *key)
{
    if (!key)
        return -1;

    if (strlen(k) == 1)
    {
        *key = keyCodeForChar(*k);
        return 0;
    }

    *key = K_NOT_A_KEY;

    KeyNames *kn = key_names;
    while (kn->name)
    {
        if (strcmp(k, kn->name) == 0)
        {
            *key = kn->key;
            break;
        }
        kn++;
    }

    if (*key == K_NOT_A_KEY)
    {
        return -2;
    }

    return 0;
}

int CheckKeyFlags(char *f, MMKeyFlags *flags)
{
    if (!flags)
        return -1;

    if (strcmp(f, "alt") == 0 || strcmp(f, "right_alt") == 0)
    {
        *flags = MOD_ALT;
    }
    else if (strcmp(f, "command") == 0)
    {
        *flags = MOD_META;
    }
    else if (strcmp(f, "control") == 0 || strcmp(f, "right_control") == 0 || strcmp(f, "left_control") == 0)
    {
        *flags = MOD_CONTROL;
    }
    else if (strcmp(f, "shift") == 0 || strcmp(f, "right_shift") == 0)
    {
        *flags = MOD_SHIFT;
    }
    else if (strcmp(f, "none") == 0)
    {
        *flags = MOD_NONE;
    }
    else
    {
        return -2;
    }

    return 0;
}

int GetFlagsFromString(Napi::String value, MMKeyFlags *flags)
{
    std::string str = value.Utf8Value();
    return CheckKeyFlags((char *)str.c_str(), flags);
}

int GetFlagsFromValue(const Napi::CallbackInfo &info, Napi::Value value, MMKeyFlags *flags)
{
    if (!flags)
        return -1;

    // Optionally allow an array of flag strings to be passed.
    if (value.IsArray())
    {
        Napi::Array a = Napi::Array::Array(info.Env(), value);
        for (uint32_t i = 0; i < a.Length(); i++)
        {
            if (a.Has(i))
            {
                Napi::String v = Napi::String::String(info.Env(), a.Get(i));
                if (!v.IsString())
                    return -2;

                MMKeyFlags f = MOD_NONE;
                const int rv = GetFlagsFromString(v, &f);
                if (rv)
                    return rv;

                *flags = (MMKeyFlags)(*flags | f);
            }
        }
        return 0;
    }

    // If it's not an array, it should be a single string value.
    Napi::String str = Napi::String::String(info.Env(), value);
    return GetFlagsFromString(str, flags);
}

Napi::Number _keyTap(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    MMKeyFlags flags = MOD_NONE;
    MMKeyCode key;

    char *k;

    std::string kStr = info[0].As<Napi::String>().Utf8Value();
    k = (char *)(kStr.c_str());

    switch (info.Length())
    {
    case 2:
        switch (GetFlagsFromValue(info, info[1], &flags))
        {
        case -1:
            JSError(env, "Null pointer in key flag.");
            break;
        case -2:
            JSError(env, "Invalid key flag specified.");
            break;
        }
        break;
    case 1:
        break;
    default:
        JSError(env, "Invalid number of arguments.");
        return Napi::Number::New(env, 0);
    }

    switch (CheckKeyCodes(k, &key))
    {
    case -1:
        JSError(env, "Null pointer in key code.");
        break;
    case -2:
        JSError(env, "Invalid key code specified.");
        break;
    default:
        toggleKeyCode(key, true, flags);
        microsleep(keyboardDelay);
        toggleKeyCode(key, false, flags);
        microsleep(keyboardDelay);
        break;
    }

    return Napi::Number::New(env, 1);
}

Napi::Number _keyToggle(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    MMKeyFlags flags = MOD_NONE;
    MMKeyCode key;

    bool down;
    char *k;

    // Get arguments from JavaScript.

    std::string kStr = info[0].As<Napi::String>().Utf8Value();
    k = (char *)(kStr.c_str());

    // Check and confirm number of arguments.
    switch (info.Length())
    {
    case 3:
        // Get key modifier.
        switch (GetFlagsFromValue(info, info[2], &flags))
        {
        case -1:
            JSError(env, "Null pointer in key flag.");
            break;
        case -2:
            JSError(env, "Invalid key flag specified.");
            break;
        }
        break;
    case 2:
        break;
    default:
        JSError(env, "Invalid number of arguments.");
    }

    // Get down value if provided.
    if (info.Length() > 1)
    {
        char *d;

        std::string dStr = info[1].As<Napi::String>().Utf8Value();
        d = (char *)(dStr.c_str());

        if (strcmp(d, "down") == 0)
        {
            down = true;
        }
        else if (strcmp(d, "up") == 0)
        {
            down = false;
        }
        else
        {
            JSError(env, "Invalid key state specified.");
        }
    }

    // Get the actual key.
    switch (CheckKeyCodes(k, &key))
    {
    case -1:
        JSError(env, "Null pointer in key code.");
    case -2:
        JSError(env, "Invalid key code specified.");
    default:
        toggleKeyCode(key, down, flags);
        microsleep(keyboardDelay);
    }

    return Napi::Number::New(env, 1);
}

Napi::Number _unicodeTap(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    size_t value = info[0].As<Napi::Number>().Int32Value();

    if (value != 0)
    {
        unicodeTap(value);

        return Napi::Number::New(env, 1);
    }
    else
    {
        JSError(env, "Invalid character typed.");
    }
}

Napi::Number _typeString(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    if (info.Length() > 0)
    {
        char *str;
        std::string string = info[0].As<Napi::String>().Utf8Value();

        str = (char *)(string.c_str());

        typeStringDelayed(str, 0);

        return Napi::Number::New(env, 1);
    }
    else
    {
        JSError(env, "Invalid number of arguments.");
    }
}

Napi::Number _typeStringDelayed(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    if (info.Length() > 0)
    {
        char *str;
        std::string string = info[0].As<Napi::String>().Utf8Value();

        str = (char *)(string.c_str());

        size_t cpm = info[1].As<Napi::Number>().Int32Value();

        typeStringDelayed(str, cpm);

        return Napi::Number::New(env, 1);
    }
    else
    {
        JSError(env, "Invalid number of arguments.");
    }
}

Napi::Number _setKeyboardDelay(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    if (info.Length() != 1)
    {
        JSError(env, "Invalid number of arguments.");
    }

    keyboardDelay = info[0].As<Napi::Number>().Int32Value();

    return Napi::Number::New(env, 1);
}

Napi::Object Init(Napi::Env env, Napi::Object exports)
{
    exports.Set("getCurrentProcessId", Napi::Function::New(env, _GetCurrentProcessId));
    exports.Set("keyTap", Napi::Function::New(env, _keyTap));
    exports.Set("keyToggle", Napi::Function::New(env, _keyToggle));
    exports.Set("unicodeTap", Napi::Function::New(env, _unicodeTap));
    exports.Set("typeString", Napi::Function::New(env, _typeString));
    exports.Set("typeStringDelayed", Napi::Function::New(env, _typeStringDelayed));
    exports.Set("setKeyboardDelay", Napi::Function::New(env, _setKeyboardDelay));
    return exports;
}

NODE_API_MODULE(kerneljs, Init)
