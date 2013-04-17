/**
 * Defines the dynamically changeable configuration
 * @type requireJsConfig
 */
requireJsConfig = {
    'scpriptBase' : "",
    'devMode' : false
};

function requireJs(){
    var resourceList = new Array();
    var loadedFiles = new Array();

    // Determines if the item with the given name and identifier exists in the internal list
    function existsInList(itemName){
        if(getItem(itemName) != null){
            return true;
        }
        return false;
    };

    // Gets the item with the given identifier and name
    // Returns null if not found
    function getItem(itemName){
        for(var resourceIndex = 0; resourceIndex < resourceList.length; resourceIndex++){
            if(resourceList[resourceIndex].name === itemName){
                return resourceList[resourceIndex];
            }
        }
        return null;
    };

    function loadFile(filePath){
        var fileIndex = loadedFiles.indexOf(filePath)

        if(fileIndex == -1){
            eval(fetchFile(filePath))

            if(!requireJsConfig.devMode){
                loadedFiles.push(filePath);
            }
        }
    }

    function fetchFile(filePath){
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

    this.register = function(moduleName, moduleFile){
        if(moduleName === ''){
            throw new Error('The requirement name was empty');
        }
        if(moduleFile === ''){
            throw new Error('The requirement location was empty');
        }
        resourceList.push({
                'name' : moduleName,
                'file' : moduleFile,
                'loaded' : false
            });
    };

    this.load = function(name){
        if(!existsInList(name)){
            return;
        }
        var item = getItem(name);
        var filePath = normalizeFilePath(item.file);
        loadFile(filePath);
        item.loaded = true;
    };
}

window.ioc = new requireJs();
window.register = ioc.register;
window.load = ioc.load;