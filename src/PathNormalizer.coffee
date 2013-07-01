class PathNormalizer
  constructor: (@url, @baseUrl) ->
  normalizeUrl: ->
    isExternalUrlRegex = ///^https?://.*.js$///
    isJavascriptRegex = ///.js$///

    normalizedUrl = if isJavascriptRegex.test(@url) then @url else @url + '.js'
    if isExternalUrlRegex.test(normalizedUrl) then normalizedUrl else @normalizeBaseUrl(@baseUrl) + normalizedUrl

  normalizeBaseUrl: (baseUrl) ->
    if ////$///.test(baseUrl) then baseUrl else baseUrl + '/'


module.exports = PathNormalizer