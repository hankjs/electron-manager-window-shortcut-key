{
  "targets": [
    {
      "target_name": "kerneljs",
      'cflags!': [ '-fno-exceptions' ],
      'cflags_cc!': [ '-fno-exceptions' ],
      'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ],
      'include_dirs': [
        "<!(node -p \"require('node-addon-api').include_dir\")",
        "src",
        "src/platform",
        "src/platform/windows",
        "src/robotjs",
        "src/robotjs/windows"
      ],
      "sources": [ "src/kerneljs.cc"],
      "conditions": [
        ['OS=="win"',
          {
            "defines": ["IS_WINDOWS"],
            "sources": [
                "src/platform/windows/processInfo.cc",
                "src/robotjs/windows/keycode.cc",
                "src/robotjs/windows/keypress.cc",
            ],
            "libraries": ["Kernel32.lib", "User32.lib"],
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