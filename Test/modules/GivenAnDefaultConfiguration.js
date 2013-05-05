module('GIVEN a default configured require js');

//Default configuration checks
test('THEN script base set to empty string', function(){
    equal("", requireJsConfig.scpriptBase, "Default script base is set to an empty string");
});
test('THEN development mode is disabled', function(){
    equal(false, requireJsConfig.devMode, "Developer mode is disabled by default");
});
test('THEN safe mode is disabled by default', function(){
    equal(false, requireJsConfig.safeMode, "Development mode is disabled by default");
});

//Default registrations
test('THEN ioc function registered on window object', function(){
    ok(window.ioc, "ioc function is registered on the window object");
});
test('THEN register function registered on windows object', function(){
    ok(window.register, "register function is registered on the window object");
});
test('THEN load function registered on windows object', function(){
    ok(window.load, "load function is registered on the window object");
});

//Requirement registration
test('WHEN register called with empty requirement location THEN an error is thrown', function(){
    throws(function(){
            register('some resource', '')},
        /The requirement location was empty/,
        'Error raised because the requirements location was not given');
});
test('WHEN register called with empty requirement name THEN an error is thrown', function(){
    throws(function(){
            register('', 'some location')},
        /The requirement name was empty/,
        'Error raised because the requirement name was not given');
});
test('WHEN register called THEN registration not marked as loaded', function(){
    register("name", "path");
    ok(!ioc.get("name").loaded, "The resource is marked as not loaded");
});