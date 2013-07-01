module.exports= (grunt) ->

  grunt.initConfig
    pkg : grunt.file.readJSON('package.json')
    coffee :
      compile :
        options :
          join: true
        files :
          'bin/requireJs-<%= pkg.version %>.js' :
            [
              'src/PathNormalizer.coffee'
              'src/ResourceManager.coffee'
            ]
    nodeunit :
      all: ['Test/*_fixture.coffee']

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-nodeunit'

  grunt.registerTask 'default', [
    'nodeunit:all'
    'coffee:compile'
  ]

  grunt.registerTask 'travis', [
    'nodeunit:all'
    'coffee:compile'
  ]