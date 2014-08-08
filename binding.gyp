{
  "includes": [
    "common.gypi",
  ],
  
  "targets":  [
    {
      "target_name": "colony_compiler_bytecode",
      "dependencies": [
        "colony-lua",
      ],
      'include_dirs': [
        "<!(node -e \"require('nan')\")",
      ],
      "sources": [
        "src/bytecode/binding.cc"
      ]
    },
    {
      "target_name": "colony-lua",
      "product_name": "colony-lua",
      "type": "static_library",
      "defines": [
        'LUA_USELONGLONG',
        'LUA_OVERRIDE_SOURCEMAP',
      ],
      "conditions": [
        ["OS=='win'", {
          'defines': [
            '_WIN32'
          ],
        }],
      ],
      "sources": [
        '<(colony_lua_path)/src/lapi.c',
        '<(colony_lua_path)/src/lauxlib.c',
        '<(colony_lua_path)/src/lbaselib.c',
        '<(colony_lua_path)/src/lcode.c',
        '<(colony_lua_path)/src/ldblib.c',
        '<(colony_lua_path)/src/ldebug.c',
        '<(colony_lua_path)/src/ldo.c',
        '<(colony_lua_path)/src/lfunc.c',
        '<(colony_lua_path)/src/lgc.c',
        '<(colony_lua_path)/src/linit.c',
        '<(colony_lua_path)/src/liolib.c',
        '<(colony_lua_path)/src/llex.c',
        '<(colony_lua_path)/src/lmathlib.c',
        '<(colony_lua_path)/src/lmem.c',
        '<(colony_lua_path)/src/loadlib.c',
        '<(colony_lua_path)/src/lobject.c',
        '<(colony_lua_path)/src/lopcodes.c',
        '<(colony_lua_path)/src/loslib.c',
        '<(colony_lua_path)/src/lparser.c',
        '<(colony_lua_path)/src/lstate.c',
        '<(colony_lua_path)/src/lstring.c',
        '<(colony_lua_path)/src/lstrlib.c',
        '<(colony_lua_path)/src/ltable.c',
        '<(colony_lua_path)/src/ltablib.c',
        '<(colony_lua_path)/src/ltm.c',
        '<(colony_lua_path)/src/lvm.c',
        '<(colony_lua_path)/src/lzio.c',
        '<(colony_lua_path)/src/print.c',
        '<(colony_lua_path)/src/ldump.c',
        '<(colony_lua_path)/src/lundump.c',
      ],

      # Lua uses tmpname and has empty bodies and doesn't use some vars
      'cflags': [
        '-Wno-deprecated-declarations',
        '-Wno-empty-body',
        '-Wno-unused-but-set-variable',
        '-Wno-unused-value',
        '-Wno-unused-variable',
        '-Wno-unknown-warning-option',
      ],
      'xcode_settings': {
        'OTHER_CFLAGS': [
          '-Wno-deprecated-declarations',
          '-Wno-empty-body',
          '-Wno-unused-but-set-variable',
          '-Wno-unused-value',
          '-Wno-unknown-warning-option',
        ],
      },

      "include_dirs": [
        "<(colony_lua_path)/src",
      ],
      'direct_dependent_settings': {
        'defines': [
          'COLONY_LUA',
          'LUA_USELONGLONG',
        ],
        'include_dirs': [
          "<(colony_lua_path)/src",
          "<(colony_lua_path)/etc",
        ],
        'conditions': [
          ['OS!="win"', {
            'link_settings': {
              'libraries': [
                '-lm'
              ]
            }
          }]
        ],
      }
    },
  ]
}