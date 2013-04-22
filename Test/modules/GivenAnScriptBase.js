requireJsConfig.scpriptBase = "http://somepage/script";

module("Requirement registration");
test("When registering a .js terminated resource then the path is normalized", function(){
    register('testRequirement', 'path.js');
    var requirement = window.ioc.get("testRequirement");
    ok(requirement, "The requirement was found");
    equal(requirement.file, "http://somepage/script/path.js", "The resource path matches http://somepage/script/path.js");
});
test("When registering a non .js terminated resource then path is normalized", function(){
    register('testRequirement', 'path');
    var requirement = window.ioc.get("testRequirement");
    ok(requirement, "The requirement was found");
    equal(requirement.file, "http://somepage/script/path.js", "The resource path matches http://somepage/script/path.js");
});