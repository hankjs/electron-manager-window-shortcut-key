#include "processInfo.h"

double N_GetID()
{
  auto id = GetCurrentProcessId();
  return id;
}