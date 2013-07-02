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

  register: (name, url) ->
    if @isKnown(name) and @resources[name] is url
      @
    else if @isKnown(name) and @resources[name] is not url
      throw new Error "#{name} already registered with url: #{@resources[name]}"
    resourceMetaData =
      name : name
      url : new PathNormalizer(url, @options.scriptBase)
      loaded : false
    @resources[name] = resourceMetaData

  isKnown: (name) ->
    @resources[name]?

  isLoaded: (name) ->
    if !@resources[name]? and @resources[name].loaded then true else false

  isInDevMode : ->
    @options.developmentMode