
module.exports = function(grunt) {

    var gh_pages = { config: grunt.file.readYAML('gh-pages/_config.yml') };

    grunt.initConfig({

        'copy': {
            'main': {
                expand: true,
                cwd: 'KR/',
                src: ['**/*.md', '!documentation.md', '!gh-pages'],
                dest: 'gh-pages/doc/',
            },
        },
        'gh-pages': {
            options: {
                base: 'gh-pages',
                repo: 'https://github.com/xpressengine/Composer-korean-docs.git'
            },
            src: ['**/*']
        },
        'build': {
            kr_docs: {
                src: 'gh-pages/doc/**/*'
            },
            options: {
                permalink_prefix : '/doc/'
            }
        }
    });

    grunt.registerMultiTask('build', 'build gh-pages for jeykll', function () {

        var options = this.options({
            permalink_prefix: '/doc/',
        });

        this.filesSrc.forEach(function(file) {
                if (grunt.file.isDir(file)) {
                    return;
                }
                var  content = grunt.file.read(file),
                    firstLine = content.split('\n')[0].replace("# ", ""),
                    prepend = '',
                    append = '',
                    permalink = file.replace(/(gh-pages)/, '');

                if(content.charAt(0) !== '#') {
                    return;
                }

                prepend = '---\n';
                prepend += 'layout: default\n';
                prepend += 'title: "' + firstLine + '"\n';
                prepend += 'permalink: ' + permalink + '/\n';
                prepend += '---\n\n';

                // replace regex
                content = content.replace(/([\{|\}]{2,})/g, '{% raw %}$1{% endraw %}');
                content = content.replace(/\((\/docs\/)/g, '(' + gh_pages.config.baseurl + '$1');

                // save file
                grunt.file.write( file, [prepend, content, append].join('') );
            });

        });

    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', [ 'copy', 'build']);
    grunt.registerTask('deploy', ['gh-pages']);
};
