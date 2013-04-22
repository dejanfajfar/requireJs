requireJsConfig.safeMode = true;

module("Check registrations");
test("When safe mode is asctive then the configuration is set accordingly", function(){
    ok(requireJsConfig.safeMode, "Save mode is active");
})
test("When safe mode is active then \"require\" global function not registered", function(){
    ok(window.register == undefined, "The register function is unregistered");
});