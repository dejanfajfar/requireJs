requireJsConfig = {
    'scpriptBase' : "",
    'devMode' : false,
    'safeMode' : false
};

function requireJs(){
    var resourceList = new Array();
    var loadedFiles = new Array();

    function existsInList(itemName){
        if(getItem(itemName) != null){
            return true;
        }
        return false;
    };

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
        var externalUrlTester = new RegExp('^https?://.*.js$', 'i');
        var javaScriptFileTester = new RegExp('.js$', 'i');
        var scriptBaseUrlTester = new RegExp('//$', 'i');

        if(requireJsConfig.scpriptBase != ""
            && !scriptBaseUrlTester.test(requireJsConfig.scpriptBase)){
            requireJsConfig.scpriptBase = requireJsConfig.scpriptBase + "/";
        }

        if(!javaScriptFileTester.test(filePath)){
            filePath += ".js";
        }

        if(!externalUrlTester.test(filePath)){
            filePath = requireJsConfig.scpriptBase + filePath;
        }

        return filePath;
    };

    this.register = function(resourceIdentifier, resourcePath){
        if(resourceIdentifier === ''){
            throw new Error('The requirement name was empty');
        }
        if(resourcePath === ''){
            throw new Error('The requirement location was empty');
        }
        resourceList.push({
                'name' : resourceIdentifier,
                'file' : normalizeFilePath(resourcePath),
                'loaded' : false
            });
    };

    this.load = function(resourceIdentifier){
        if(!existsInList(resourceIdentifier)){
            return;
        }
        var item = getItem(resourceIdentifier);
        var filePath = item.file;
        loadFile(filePath);
        item.loaded = true;
    };

    this.knows = function(resourceIdentifier){
        var resourceItem = getItem(resourceIdentifier);
        return resourceItem == null;
    }

    this.get = function(resourceIdentifier){
        return getItem(resourceIdentifier);
    }
}

window.requireJs = new requireJs();

if(requireJsConfig.safeMode == false){
    window.ioc = window.requireJs;
    window.register = ioc.register;
    window.load = ioc.load;
}