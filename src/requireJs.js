/**
 * Defines the dynamically changeable configuration
 * @type requireJsConfig
 */
requireJsConfig = {
    'scpriptBase' : "",
    'devMode' : true
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
        for(var elementIndex = 0; elementIndex < itemList.length; elementIndex++){
            if(itemList[elementIndex].name === itemName && itemList[elementIndex].identifier === identifier){
                return itemList[elementIndex];
            }
        }
        return null;
    };

    /**
     *
     * @param filePath
     */
    function LoadFile(filePath){
        var fileIndex = loadedFiles.indexOf(filePath)

        if(fileIndex == -1){
            eval(FetchFile(filePath))

            if(!requireJsConfig.devMode){
                loadedFiles.push(filePath);
            }
        }
    }

    function FetchFile(filePath){
        var httpRequest = new XMLHttpRequest();
        httpRequest.open("GET",filePath, false);
        httpRequest.send();
        return httpRequest.responseText;
    };

    function normalizeFilePath(filePath){
        var externalUrlTester = new RegExp('^https?://.*.js$');
        var javaScriptFileTester = new RegExp('.js$');

        if(!javaScriptFileTester.test(filePath)){
            filePath += ".js";
        }

        if(!externalUrlTester.test(filePath)){
            filePath = requireJsConfig.scpriptBase + filePath;
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
            this.loadModule(name);
        }
        else if(existsInList(functionIdentifier, name)){
            this.loadFunction(name);
        }
    };

    this.loadFunction = function(functionName){
        if(!existsInList(functionIdentifier, functionName)){
            return;
        }
        var item = getItem(functionIdentifier, functionName);
        var filePath = normalizeFilePath(item.file);
        LoadFile(filePath);
        item.loaded = true;
    };

    this.loadModule = function(moduleName){
        if(!existsInList(moduleIdentifier, moduleName)){
            return;
        }
        var item = getItem(moduleIdentifier, moduleName);
        var filePath = normalizeFilePath(item);
        LoadFile(filePath);
        item.loaded = true;
    };
}

window.ioc = new requireJs();
window.register = ioc.registerFunction;