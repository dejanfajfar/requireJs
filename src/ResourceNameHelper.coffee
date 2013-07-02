class ResourceNameHelper
  constructor : (@name) ->
    @namespacePattern = ///^[\S]*.*\.///
  getModuleName : ->
    if @name?
      ""
    else
      @namespacePattern.match(@name)
