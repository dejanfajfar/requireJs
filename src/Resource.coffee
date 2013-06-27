class Resource
  Resource: ->
    @loaded = false
    @
  setId: (id) ->
    @id = id
    @
  setResourcePath: (path) ->
    @resourcePaht = path
    @
  fromJson: (obj) ->
    @id = obj.id
    @resourcePaht = obj.resourcePath
    @
  getId: ->
    @id
  getResourcePath: ->
    @resourcePaht
  markAsLoaded: ->
    @loaded = true
    @
  isResourceLoaded: ->
    @loaded