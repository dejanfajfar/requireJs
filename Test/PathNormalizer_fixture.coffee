PathNormalizer = require '../src/PathNormalizer'

exports.PathNormalizerTests =

  'Base path not ending with // should be extended' : (test) ->
    normalizer = new PathNormalizer('fileLocation.js', 'http://somewhere')
    result = normalizer.normalizeUrl()
    test.equal(result, 'http://somewhere/fileLocation.js')
    test.done()

  'Base path ending with // should not be extended' : (test) ->
    normalizer = new PathNormalizer('fileLocation.js', 'http://somewhere/')
    result = normalizer.normalizeUrl()
    test.equal(result, 'http://somewhere/fileLocation.js')
    test.done()

  'If resource location not ending with .js then .js appended' : (test) ->
    normalizer = new PathNormalizer('fileLocation', 'http://somewhere/')
    result = normalizer.normalizeUrl()
    test.equal(result, 'http://somewhere/fileLocation.js')
    test.done()