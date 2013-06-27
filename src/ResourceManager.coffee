defaultResourceManagerOptions =
  developmentMode : false
  scriptBase : "~/"

class ResourceManager
  ResourceManager: (options) ->
    @options.developmentMode = options.devMode ? defaultResourceManagerOptions.developmentMode
    @options.scriptBase = options.scriptBase ? defaultResourceManagerOptions.scriptBase
    @
  ResourceManager: ->
    this.knownResources = {};
    this.loadedResources = new Array();
  registerResource: (resource) ->
    this.knownResources[resource.Id] = resourceIdentifier;
  unregisterResource: (resourceName) ->

