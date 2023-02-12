#pragma once
#ifndef KEYPRESS_H
#define KEYPRESS_H

#include "os.h"
#include "keycode.h"

enum _MMKeyFlags {
    MOD_NONE = 0,
    /* These are already defined by the Win32 API */
    /* MOD_ALT = 0,
    MOD_CONTROL = 0,
    MOD_SHIFT = 0, */
    MOD_META = MOD_WIN
};

typedef unsigned int MMKeyFlags;

/* Send win32 key event for given key. */
void win32KeyEvent(int key, MMKeyFlags flags);

/* Toggles the given key down or up. */
void toggleKeyCode(MMKeyCode code, const bool down, MMKeyFlags flags);

/* Toggles the key down and then up. */
void tapKeyCode(MMKeyCode code, MMKeyFlags flags);

/* Toggles the key corresponding to the given UTF character up or down. */
void toggleKey(char c, const bool down, MMKeyFlags flags);
void tapKey(char c, MMKeyFlags flags);

/* Sends a Unicode character without modifiers. */
void unicodeTap(const unsigned value);

/* Macro to convert WPM to CPM integers.
 * (the average English word length is 5.1 characters.) */
#define WPM_TO_CPM(WPM) (unsigned)(5.1 * WPM)

/* Sends a UTF-8 string without modifiers and with partially random delays between each letter.
 * Note that deadbeef_srand() must be called before this function if you actually want
 * randomness. */
void typeStringDelayed(const char *str, const unsigned cpm);

#endif /* KEYPRESS_H */
