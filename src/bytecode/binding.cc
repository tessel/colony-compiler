#include <stdio.h>
#include <stdlib.h>
#include <node.h>
#include "nan.h"
//#include "node_pointer.h"

using namespace v8;

#include <lua.hpp>
// #include <luajit.h>

// #include <emscripten.h>
#include <stdlib.h>
#include <string.h>

#define BUF_SIZE 1024


uint8_t* buffer_pointer = NULL;
size_t buffer_pointer_len = 0;

static int bufbuilder(lua_State* L, unsigned char* str, size_t len, struct luaL_Buffer *buf)
{
	buffer_pointer = (uint8_t*) realloc(buffer_pointer, buffer_pointer_len + len);
	memcpy(&buffer_pointer[buffer_pointer_len], str, len);
	buffer_pointer_len += len;
    return 0;
}

Persistent<Object> sourcemap;

extern "C" {
int _lua_sourcemap (int i)
{
    int line = sourcemap->Get(NanNew<Number>(i - 1))->NumberValue();
    if (line <= 0) {
        line = sourcemap->Get(NanNew<Number>(sourcemap->Get(NanSymbol("length"))->NumberValue() - 1))->NumberValue();
    }
    // printf("OH %d\n", line);
    return 14;
}
}

lua_State *L;

int go_for_it (char *content, size_t contentSize, const char* name)
{
    luaL_Buffer buf;
    int res;
    L = lua_open();  /* create state */
    luaL_buffinit(L, &buf);

    // ** test 1 - works as expected
    lua_settop(L,0);
    res = luaL_loadbuffer(L, content, strlen(content), name);
    if (res == 0) {
        lua_dump(L, (lua_Writer)bufbuilder, &buf);
    }
    return res;
}

NAN_METHOD(Compile) {
    NanScope();

    size_t str_len = 0;
    char *str = NanCString(args[0], &str_len);

    size_t namestr_len = 0;
    char *namestr = NanCString(args[1], &namestr_len);

    Local<Object> sourcemapobj = args[2]->ToObject();
    NanAssignPersistent(sourcemap, sourcemapobj);
    buffer_pointer = NULL;
    buffer_pointer_len = 0;
    int res = go_for_it(str, str_len, namestr); // "=namestr");
    NanDisposePersistent(sourcemap);

    if (res > 0) {
    	NanReturnValue(NanNew<String>(lua_tostring(L, -1)));
    } else {
    	NanReturnValue(NanNewBufferHandle((char*) buffer_pointer, buffer_pointer_len));
    }
}

#define EXPORT_METHOD(C, S) C->Set(NanSymbol(# S), NanNew<FunctionTemplate>(S)->GetFunction());
#define EXPORT_CONSTANT(C, S) C->Set(NanSymbol(# S), NanNew<Number>(S));

void InitAll(Handle<Object> exports) {
    // Export functions.
    EXPORT_METHOD(exports, Compile);
}

NODE_MODULE(colony_compiler_bytecode, InitAll)
