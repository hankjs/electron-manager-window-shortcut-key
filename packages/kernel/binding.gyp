{
  "targets": [
    {
      "target_name": "kernel",
      'cflags!': [ '-fno-exceptions' ],
      'cflags_cc!': [ '-fno-exceptions' ],
      'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ],
      'include_dirs': ["<!(node -p \"require('node-addon-api').include_dir\")", "src", "src", "src/platform", "src/platform/windows"],
      "sources": [ "src/export.cc"],
      "conditions": [
        ['OS=="win"',
          {
            "sources": [ "src/platform/windows/processInfo.cc" ],
            "libraries": ["Kernel32.lib"],
            "msvs_settings": {
              "VCCLCompilerTool": {
                "AdditionalOptions": ["/std:c++17"]
              }
            },
          }
        ],
      ]
    }
  ]
}