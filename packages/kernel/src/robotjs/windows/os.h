#pragma once
#ifndef OS_H
#define OS_H

#if !defined(IS_WINDOWS) && (defined(WIN32) || defined(_WIN32) || \
                             defined(__WIN32__) || defined(__WINDOWS__))
	#define IS_WINDOWS
#endif /* IS_WINDOWS */

#if defined(IS_WINDOWS)
    #ifndef STRICT
        #define STRICT /* Require use of exact types. */
    #endif
	#define WIN32_LEAN_AND_MEAN 1 /* Speed up compilation. */
	#include <windows.h>
#endif

/* Interval to align by for large buffers (e.g. bitmaps). */
/* Must be a power of 2. */
#ifndef BYTE_ALIGN
	#define BYTE_ALIGN 4 /* Bytes to align pixel buffers to. */
	/* #include <stddef.h> */
	/* #define BYTE_ALIGN (sizeof(size_t)) */
#endif /* BYTE_ALIGN */

#if BYTE_ALIGN == 0
	/* No alignment needed. */
	#define ADD_PADDING(width) (width)
#else
	/* Aligns given width to padding. */
	#define ADD_PADDING(width) (BYTE_ALIGN + (((width) - 1) & ~(BYTE_ALIGN - 1)))
#endif

#endif /* OS_H */
