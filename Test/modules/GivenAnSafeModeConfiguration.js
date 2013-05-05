module("GIVEN an activated safe mode", {
    setup: function(){
        window.tempSafeMode = requireJsConfig.safeMode;
        requireJsConfig.safeMode = true;
        window.requireJs.registerGlobals();
    },
    teardown: function(){
        requireJsConfig.safeMode = window.tempSafeMode;
        window.requireJs.registerGlobals();
    }
});
test("THEN safe mode is activated", function(){
    ok(requireJsConfig.safeMode, "Save mode is active");
})
test("THEN \"require\" global function not registered", function(){
    ok(register == undefined, "The register function is undefined");
});
test("THEN ioc global function not registered", function(){
    ok(ioc == undefined, "The ioc function is undefined");
});
test("THEN load global function not registered", function(){
    ok(load == undefined, "The load function is undefined");
});