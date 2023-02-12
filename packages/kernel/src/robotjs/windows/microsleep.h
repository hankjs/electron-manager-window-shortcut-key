#pragma once
#ifndef MICROSLEEP_H
#define MICROSLEEP_H

#include "os.h"
#include "inline_keywords.h"

/*
 * A more widely supported alternative to usleep(), based on Sleep() in Windows
 * and nanosleep() everywhere else.
 *
 * Pauses execution for the given amount of milliseconds.
 */
H_INLINE void microsleep(double milliseconds)
{
	Sleep((DWORD)milliseconds); /* (Unfortunately truncated to a 32-bit integer.) */
}

#endif /* MICROSLEEP_H */
