{
  "variables": {
    'builtin_section%': '',
  },

  'target_defaults': {
    'conditions': [
      [ 'OS=="arm"', {
        'defines': [
          'COLONY_EMBED',
          'CONFIG_PLATFORM_EMBED',
          'TM_FS_vfs',
          'HAVE_CLOSESOCKET',
        ],
        'include_dirs': [
          '<(axtls_path)/config/'
        ],
        'cflags': [
          '-mcpu=cortex-m3',
          '-mthumb',
          '-mtune=cortex-m3',
          '-march=armv7-m',
          '-mlong-calls',
          '-mfix-cortex-m3-ldrd',
          '-mapcs-frame',
          '-msoft-float',
          '-mno-sched-prolog',
          # '-fno-hosted',
          '-ffunction-sections',
          '-fdata-sections',
          # '-fpermissive',
          '-std=c99',

          '-Wall',
          #'-Wextra',
          '-Werror',
        ]
      }],
      [ 'OS!="arm"', {
        'defines': [
          'COLONY_PC', '_GNU_SOURCE'
        ],
        'cflags': [
          '-std=c99',

          '-Wall',
          #'-Wextra',
          '-Werror',
          '-Wno-unused-parameter'
        ]
      }]
    ],

    'default_configuration': 'Release',
    'configurations': {
      'Debug': {
        'conditions': [
          [ 'OS=="arm"', {
            'cflags': [
              '-gdwarf-2',
              '-Ofast',
            ]
          }],
          [ 'OS!="arm"', {
            'cflags': [
              '-O0',
              '-g',
              '-ftrapv'
            ],
            'xcode_settings': {
              'OTHER_CFLAGS': [
                '-O0',
                '-g',
                '-ftrapv'
              ]
            },
            'msvs_settings': {
              'VCCLCompilerTool': {
                'RuntimeLibrary': 1, # static debug
              },
            }
          }]
        ],
      },
      'Release': {
        'conditions': [
          [ 'OS=="arm"', {
            'cflags': [
              '-Ofast',
            ],
          }],
          [ 'OS!="arm"', {
            'cflags': [
              '-O3'
            ],
            'xcode_settings': {
              'OTHER_CFLAGS': [
                '-O3',
              ]
            },
            'msvs_settings': {
              'VCCLCompilerTool': {
                'RuntimeLibrary': 0, # static release
              },
            },
          }]
        ]
      }
    },

    'msvs_settings': {
      'VCCLCompilerTool': {
      },
      'VCLibrarianTool': {
      },
      'VCLinkerTool': {
        'GenerateDebugInformation': 'true',
      },
    },
  },

  "targets": [

    {
      'target_name': 'dir_builtin',
      'type': 'none',
      'sources': [
        '<(SHARED_INTERMEDIATE_DIR)/<(_target_name).c'
      ],
      'actions': [
        {
          'action_name': '<(_target_name)_compile',
          'inputs': [
            'lib/js/assert.js',
            'lib/js/buffer.js',
            'lib/js/child_process.js',
            'lib/js/crypto.js',
            'lib/js/dgram.js',
            'lib/js/dns.js',
            'lib/js/events.js',
            'lib/js/fs.js',
            'lib/js/http.js',
            'lib/js/https.js',
            'lib/js/net.js',
            'lib/js/os.js',
            'lib/js/path.js',
            'lib/js/punycode.js',
            'lib/js/querystring.js',
            'lib/js/repl.js',
            'lib/js/stream.js',
            'lib/js/string_decoder.js',
            'lib/js/tty.js',
            'lib/js/url.js',
            'lib/js/util.js',
            'lib/js/zlib.js',
          ],
          'outputs': [
            '<(SHARED_INTERMEDIATE_DIR)/<(_target_name).c',
          ],
          'action': [ 'tools/compile_folder.sh', '<(SHARED_INTERMEDIATE_DIR)/<(_target_name).c', '<(_target_name)', '<(builtin_section)', '<@(_inputs)' ],
        },
      ]
    },

    {
      'target_name': 'dir_runtime_lib',
      'type': 'none',
      'sources': [
        '<(SHARED_INTERMEDIATE_DIR)/<(_target_name).c'
      ],
      'actions': [
        {
          'action_name': '<(_target_name)_compile',
          'inputs': [
            'lib/lua/cli.lua',
            'lib/lua/colony-init.lua',
            'lib/lua/colony-js.lua',
            'lib/lua/colony-node.lua',
            'lib/lua/colony.lua',
            'lib/lua/preload.lua',
          ],
          'outputs': [
            '<(SHARED_INTERMEDIATE_DIR)/<(_target_name).c',
          ],
          'action': [ 'tools/compile_folder.sh', '<(SHARED_INTERMEDIATE_DIR)/<(_target_name).c', '<(_target_name)', '<(builtin_section)', '<@(_inputs)' ],
        },
      ]
    },

    {
      "target_name": "colony",
      "product_name": "colony",
      "type": "executable",
      'cflags': [ '-Wall', '-Wextra', '-Werror' ],
      "defines": [
        'REGEX_WCHAR',
        'REGEX_STANDALONE',
        '_NDEBUG'
      ],
      "sources": [
        '<(SHARED_INTERMEDIATE_DIR)/dir_builtin.c',
        '<(SHARED_INTERMEDIATE_DIR)/dir_runtime_lib.c',
        'lib/lua_cares.c',
        'lib/lua_hsregex.c',
        'lib/lua_http_parser.c',
        'lib/lua_tm.c',
        'lib/lua_yajl.c',
        'lib/colony.c',
        'lib/colony_runtime.c',
        'lib/cli.c',
      ],
      "include_dirs": [
        'lib/',
        "bin/colony-lua/src",
      ],
      "dependencies": [
        '../runtime/runtime.gyp:tm',
        'dir_builtin',
        'dir_runtime_lib',
      ]
    }
  ]
}
