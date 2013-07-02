class ResourceNameHelper
  constructor : (@name) ->
    @module = null
  getModuleName : ->
    nameSplit = @name.split '.'
    @module = nameSplit[0]
    @module