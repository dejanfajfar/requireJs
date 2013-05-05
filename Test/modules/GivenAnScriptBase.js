module("GIVEN a configured script base", {
    setup: function(){
        window.tempscriptBase = requireJsConfig.scpriptBase;
        requireJsConfig.scpriptBase = "http://somepage/script";
    },
    teardown: function(){
        requireJsConfig.scpriptBase = window.tempscriptBase;
    }
});
test("WHEN registering a .js terminated resource THEN the path is normalized", function(){
    register('testRequirement', 'path.js');
    var requirement = ioc.get("testRequirement");
    ok(requirement, "The requirement was found");
    equal(requirement.file, "http://somepage/script/path.js", "The resource path matches http://somepage/script/path.js");
});
test("WHEN registering a non .js terminated resource THEN path is normalized", function(){
    register('testRequirement', 'path');
    var requirement = ioc.get("testRequirement");
    ok(requirement, "The requirement was found");
    equal(requirement.file, "http://somepage/script/path.js", "The resource path matches http://somepage/script/path.js");
});