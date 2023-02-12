#include "keypress.h"
#include "microsleep.h"

/* Convenience wrappers around ugly APIs. */
#define WIN32_KEY_EVENT_WAIT(key, flags) \
    (win32KeyEvent(key, flags))

void win32KeyEvent(int key, MMKeyFlags flags)
{
    int scan = MapVirtualKey(key & 0xff, MAPVK_VK_TO_VSC);

    /* Set the scan code for extended keys */
    switch (key)
    {
    case VK_RCONTROL:
    case VK_SNAPSHOT: /* Print Screen */
    case VK_RMENU:    /* Right Alt / Alt Gr */
    case VK_PAUSE:    /* Pause / Break */
    case VK_HOME:
    case VK_UP:
    case VK_PRIOR: /* Page up */
    case VK_LEFT:
    case VK_RIGHT:
    case VK_END:
    case VK_DOWN:
    case VK_NEXT: /* 'Page Down' */
    case VK_INSERT:
    case VK_DELETE:
    case VK_LWIN:
    case VK_RWIN:
    case VK_APPS: /* Application */
    case VK_VOLUME_MUTE:
    case VK_VOLUME_DOWN:
    case VK_VOLUME_UP:
    case VK_MEDIA_NEXT_TRACK:
    case VK_MEDIA_PREV_TRACK:
    case VK_MEDIA_STOP:
    case VK_MEDIA_PLAY_PAUSE:
    case VK_BROWSER_BACK:
    case VK_BROWSER_FORWARD:
    case VK_BROWSER_REFRESH:
    case VK_BROWSER_STOP:
    case VK_BROWSER_SEARCH:
    case VK_BROWSER_FAVORITES:
    case VK_BROWSER_HOME:
    case VK_LAUNCH_MAIL:
    {
        flags |= KEYEVENTF_EXTENDEDKEY;
        break;
    }
    }

    /* Set the scan code for keyup */
    if (flags & KEYEVENTF_KEYUP)
    {
        scan |= 0x80;
    }

    flags |= KEYEVENTF_SCANCODE;

    INPUT keyboardInput;
    keyboardInput.type = INPUT_KEYBOARD;
    keyboardInput.ki.wVk = 0;
    keyboardInput.ki.wScan = scan;
    keyboardInput.ki.dwFlags = flags;
    keyboardInput.ki.time = 0;
    keyboardInput.ki.dwExtraInfo = 0;
    SendInput(1, &keyboardInput, sizeof(keyboardInput));
}

void toggleKeyCode(MMKeyCode code, const bool down, MMKeyFlags flags)
{
    const DWORD dwFlags = down ? 0 : KEYEVENTF_KEYUP;

    if (down)
    {
        /* Parse modifier keys. */
        if (flags & MOD_META)
            WIN32_KEY_EVENT_WAIT(K_META, dwFlags);
        if (flags & MOD_ALT)
            WIN32_KEY_EVENT_WAIT(K_ALT, dwFlags);
        if (flags & MOD_CONTROL)
            WIN32_KEY_EVENT_WAIT(K_CONTROL, dwFlags);
        if (flags & MOD_SHIFT)
            WIN32_KEY_EVENT_WAIT(K_SHIFT, dwFlags);

        WIN32_KEY_EVENT_WAIT(code, dwFlags);
    }
    else
    {
        /* Reverse order for key up */
        WIN32_KEY_EVENT_WAIT(code, dwFlags);

        /* Parse modifier keys. */
        if (flags & MOD_META)
            win32KeyEvent(K_META, dwFlags);
        if (flags & MOD_ALT)
            win32KeyEvent(K_ALT, dwFlags);
        if (flags & MOD_CONTROL)
            win32KeyEvent(K_CONTROL, dwFlags);
        if (flags & MOD_SHIFT)
            win32KeyEvent(K_SHIFT, dwFlags);
    }
}

void tapKeyCode(MMKeyCode code, MMKeyFlags flags)
{
    toggleKeyCode(code, true, flags);
    toggleKeyCode(code, false, flags);
}

void toggleKey(char c, const bool down, MMKeyFlags flags)
{
    MMKeyCode keyCode = keyCodeForChar(c);

    // Prevent unused variable warning for Mac and Linux.
    int modifiers;

    if (isupper(c) && !(flags & MOD_SHIFT))
    {
        flags |= MOD_SHIFT; /* Not sure if this is safe for all layouts. */
    }

    modifiers = keyCode >> 8; // Pull out modifers.
    if ((modifiers & 1) != 0)
        flags |= MOD_SHIFT; // Uptdate flags from keycode modifiers.
    if ((modifiers & 2) != 0)
        flags |= MOD_CONTROL;
    if ((modifiers & 4) != 0)
        flags |= MOD_ALT;
    keyCode = keyCode & 0xff; // Mask out modifiers.
    toggleKeyCode(keyCode, down, flags);
}

void tapKey(char c, MMKeyFlags flags)
{
    toggleKey(c, true, flags);
    toggleKey(c, false, flags);
}

void unicodeTap(const unsigned value)
{
    INPUT ip;

    // Set up a generic keyboard event.
    ip.type = INPUT_KEYBOARD;
    ip.ki.wVk = 0;                     // Virtual-key code
    ip.ki.wScan = value;               // Hardware scan code for key
    ip.ki.time = 0;                    // System will provide its own time stamp.
    ip.ki.dwExtraInfo = 0;             // No extra info. Use the GetMessageExtraInfo function to obtain this information if needed.
    ip.ki.dwFlags = KEYEVENTF_UNICODE; // KEYEVENTF_KEYUP for key release.

    SendInput(1, &ip, sizeof(INPUT));
}

void typeStringDelayed(const char *str, const unsigned cpm)
{
    unsigned long n;
    unsigned short c;
    unsigned short c1;
    unsigned short c2;
    unsigned short c3;

    /* Characters per second */
    const double cps = (double)cpm / 60.0;

    /* Average milli-seconds per character */
    const double mspc = (cps == 0.0) ? 0.0 : 1000.0 / cps;

    while (*str != '\0')
    {
        c = *str++;

        // warning, the following utf8 decoder
        // doesn't perform validation
        if (c <= 0x7F)
        {
            // 0xxxxxxx one byte
            n = c;
        }
        else if ((c & 0xE0) == 0xC0)
        {
            // 110xxxxx two bytes
            c1 = (*str++) & 0x3F;
            n = ((c & 0x1F) << 6) | c1;
        }
        else if ((c & 0xF0) == 0xE0)
        {
            // 1110xxxx three bytes
            c1 = (*str++) & 0x3F;
            c2 = (*str++) & 0x3F;
            n = ((c & 0x0F) << 12) | (c1 << 6) | c2;
        }
        else if ((c & 0xF8) == 0xF0)
        {
            // 11110xxx four bytes
            c1 = (*str++) & 0x3F;
            c2 = (*str++) & 0x3F;
            c3 = (*str++) & 0x3F;
            n = ((c & 0x07) << 18) | (c1 << 12) | (c2 << 6) | c3;
        }

        unicodeTap(n);

        if (mspc > 0)
        {
            microsleep(mspc);
        }
    }
}
