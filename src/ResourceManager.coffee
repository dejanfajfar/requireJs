defaultResourceManagerOptions =
  developmentMode : false
  scriptBase : "~/"

class ResourceManager
  constructor: (options) ->
    @resources = {}
    @options.developmentMode = options.devMode ? defaultResourceManagerOptions.developmentMode
    @options.scriptBase = options.scriptBase ? defaultResourceManagerOptions.scriptBase
    @
  register: (name, url) ->
    resourceMetaData =
      url : new PathNormalizer(url, @options.scriptBase)
      isLoaded : false
    @resources[name].url = resourceMetaData
  isKnown: (name) ->
    @resources[name]?
  isLoaded: (name) ->
    @resources[name].loaded