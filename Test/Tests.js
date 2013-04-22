module('Configuration default values check');
test('Script base set to default', function(){
    equal("", requireJsConfig.scpriptBase, "Default script base is set to an empty string");
});
test('Development mode disabled by default', function(){
    equal(false, requireJsConfig.devMode, "Developer mode is disabled by default");
});

module('Default registrations');
test('ioc function registered on window object', function(){
    ok(window.ioc, "ioc function is registered on the window object");
});
test('register function registered on window object', function(){
    ok(window.register, "register function is registered on the window object");
});
test('load function registered on window object', function(){
    ok(window.load, "load function is registered on the window object");
});

module('Requirement registration');
test('Registration with empty requirement location throws error', function(){
    throws(function(){
        window.register('some resource', '')},
        /The requirement location was empty/,
        'Error raised because the requirements location was not given');
});
test('Registration with empty requirement name throws error', function(){
    throws(function(){
        window.register('', 'some location')},
        /The requirement name was empty/,
        'Error raised because the requirement name was not given');
});
