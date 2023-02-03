#include <napi.h>
#include "processInfo.h"

Napi::Number _GetCurrentProcessId(const Napi::CallbackInfo &info) {
    auto env = info.Env();
    auto id = N_GetID();
    auto result = Napi::Number::New(env, id);
    return result;
}

Napi::Object Init(Napi::Env env, Napi::Object exports)
{
    exports.Set("getCurrentProcessId", Napi::Function::New(env, _GetCurrentProcessId));
    return exports;
}
NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init)