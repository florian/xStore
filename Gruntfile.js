module.exports = function (grunt) {

	grunt.initConfig({

		jshint: {
			all: ['Gruntfile.js', 'src/loStorage.js', 'spec/spec.js'],
			options: {
				browser: true,
				evil: false,
				expr: true,
				supernew: true,
				eqeqeq: true,
				eqnull: true,
				forin: true,
				smarttabs: true,
				loopfunc: true
			}
		},

		uglify: {
			options: {
				banner: grunt.file.read('src/loStorage.js').split('\n')[0] + "\n"
			},

			my_target: {
				files: {
					'src/loStorage.min.js': ['src/loStorage.js']
				}
			}
		},

		jasmine: {
			src: 'src/loStorage.js',
			options: {
				specs: 'spec/spec.js',
				vendor: 'vendor/jasmine/lib/jasmine-core/jasmine.js'
			}
		},

		watch: {
			test: {
				files: ['src/loStorage.js', 'spec/*'],
				tasks: 'test'
			},

			min: {
				files: ['src/loStorage.js'],
				tasks: 'min'
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('min', 'uglify');
	grunt.registerTask('test', ['jshint', 'jasmine']);
	grunt.registerTask('release', ['test', 'min']);
	grunt.registerTask('default', 'release');

};
