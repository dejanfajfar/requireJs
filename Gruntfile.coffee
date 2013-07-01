module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
    coffee:
      compile:
        options:
          join: true
        files:
          'bin/requireJs-<%= pkg.version %>.js':
            [
              'src/PathNormalizer.coffee'
              'src/ResourceManager.coffee'
            ]
      forTest :
        options :
          bare : true
        files :
          'bin/test/ResourceManager.js' : 'src/ResourceManager.coffee'
          'bin/test/PathNormalizer.js' : 'src/PathNormalizer.coffee'
    qunit :
      all : ['Test/*.html']

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-qunit'

  grunt.registerTask 'default', [
    'coffee:forTest'
    'qunit:all'
    'coffee:compile'
  ]

  grunt.registerTask 'travis', [
    'coffee:forTest'
    'qunit:all'
    'coffee:compile'
  ]