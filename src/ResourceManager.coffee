defaultResourceManagerOptions =
  developmentMode : false
  scriptBase : "~/"

class ResourceManager
  constructor: (options) ->
    @resources = {}
    if options?
      @options.developmentMode = options.devMode ? defaultResourceManagerOptions.developmentMode
      @options.scriptBase = options.scriptBase ? defaultResourceManagerOptions.scriptBase
    else
      @options = defaultResourceManagerOptions
    @
  register: (name, url) ->
    resourceMetaData =
      name : name
      url : new PathNormalizer(url, @options.scriptBase)
      loaded : false
    @resources[name] = resourceMetaData
  isKnown: (name) ->
    @resources[name]?
  isLoaded: (name) ->
    result = false
    result = true if !@resources[name]? and @resources[name].loaded
    result

module.exports = ResourceManager