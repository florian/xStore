module.exports = function (grunt) {

	grunt.initConfig({

		jasmine: {
			all: ['spec/index.html']
		},

		watch: {
			test: {
				files: ['spec/*'],
				tasks: 'test'
			}
		}

	});

	grunt.loadNpmTasks('grunt-jasmine-task');
	grunt.registerTask('test', 'jasmine');

};