module.exports = (grunt) ->

  # Project configuration
  grunt.initConfig
    compass:
      dist:
        options:
          config: 'compass.rb'
          sassDir: 'src/styles'
          cssDir: 'dist'

    coffee:
      app:
        options:
          bare: false
          join: true
        files:
          'dist/index.js': ['src/scripts/**/*.coffee']

    watch:
      app:
        files: ['src/scripts/**/*.coffee']
        tasks: ['coffee']
      sass:
        files: ['src/styles/*.sass']
        tasks: ['compass']

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-compass'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  # Default task
  grunt.registerTask 'default', ['compass', 'coffee']
