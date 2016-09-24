module.exports = function (grunt) {

	grunt.initConfig({

		jshint: {
			all: ['Gruntfile.js', 'src/xStore.js', 'spec/spec.js'],
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
				banner: grunt.file.read('src/xStore.js').split('\n')[0] + "\n"
			},

			my_target: {
				files: {
					'src/xStore.min.js': ['src/xStore.js']
				}
			}
		},

		jasmine: {
			src: 'src/xStore.js',
			options: {
				specs: 'spec/spec.js',
				vendor: 'vendor/jasmine/lib/jasmine-core/jasmine.js'
			}
		},

		watch: {
			test: {
				files: ['src/xStore.js', 'spec/*'],
				tasks: 'test'
			},

			min: {
				files: ['src/xStore.js'],
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
