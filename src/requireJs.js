/**
 * Defines the dynamically changeable configuration
 * @type requireJsConfig
 */
requireJsConfig = {
    'scpriptBase' : "",
    'devMode' : false
};

function requireJs(){
    var moduleIdentifier = "MODULE";
    var functionIdentifier = "FUNCTION";
    var itemList = new Array();
    var loadedFiles = new Array();

    // Determines if the item with the given name and identifier exists in the internal list
    function existsInList(identifier, itemName){
        if(getItem(identifier, itemName) != null){
            return true;
        }
        return false;
    };

    // Gets the item with the given identifier and name
    // Returns null if not found
    function getItem(identifier, itemName){
        itemList.forEach(
            function(element, index, array){
                if(element.name == itemName && element.identifier == identifier){
                    return element;
                }
            }
        );
        return null;
    };

    // Determines if the given file ius already loaded
    function isFileLoaded(filePath){
        loadedFiles.forEach(
            function(element, index, array){
                if(element == filePath){
                    return true;
                }
            }
        );
        return false;
    };

    function loadAndEvaluate(filePath){
        var httpRequest = new XMLHttpRequest();
        httpRequest.open("GET",filePath, false);
        httpRequest.send();
        var httpResponse = httpRequest.responseText;
        eval(httpResponse);
    };

    function normalizeFilePath(filePath){
        filePath = requireJsConfig.scpriptBase + filePath;
        if(filePath.match(".js$")){
            filePath = filePath + ".js";
        }
        return filePath;
    };

    this.registerFunction = function(functionName, functionFile){
        itemList.push({
                'name' : functionName,
                'file' : functionFile,
                'loaded' : false,
                'identifier' : functionIdentifier
            });
    };

    this.registerModule = function(moduleName, moduleFile){
        itemList.push(
            new {
                name : moduleName,
                file : moduleFile,
                loaded : false,
                identifier : moduleIdentifier
            });
    };

    this.load = function(name){
        if(existsInList(moduleIdentifier, name)){
            loadModule(name);
        }
        else if(existsInList(functionIdentifier, name)){
            loadFunction(name);
        }
    };

    this.loadFunction = function(functionName){
        if(existsInList(functionIdentifier, functionName)){
            return;
        }
        var item = getItem(functionIdentifier, functionName);
        var filePath = normalizeFilePath(item);
        if(!isFileLoaded(filePath)){
            loadAndEvaluate(filePath);
        }
        item.loaded = true;
    };

    this.loadModule = function(moduleName){
        if(existsInList(moduleIdentifier, moduleName)){
            return;
        }
        var item = getItem(moduleIdentifier, moduleName);
        var filePath = normalizeFilePath(item);
        if(!isFileLoaded(filePath)){
            loadAndEvaluate(filePath);
        }
        item.loaded = true;
    };
}

window.ioc = new requireJs();
window.register = ioc.registerFunction;