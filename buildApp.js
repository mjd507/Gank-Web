/**
 * Created by mjd on 2017/3/25.
 */
"use strict"
const startTime = new Date().getTime();
const exec = require('child_process').exec;
const fs = require('fs-extra');
const fsBase = require('fs');
const projectName = process.argv[2];
const merge = require('merge');
const chalk = require('chalk');

if(projectName){

    const baseProject = './project/frame/';
    const thisProject = './project/' + projectName + '/'
    const configs = {
        'webpack.config.dev.js': 'config/webpack.config.js',
        'webpack.config.prod.js': 'config/webpack.config.prod.js',
        // 'polyfills.js': 'config/polyfills.js',
        'build.js': 'scripts/build.js',
        'start.js': 'scripts/start.js'
    }
    let promise = new Promise((resolve, reject) => {
        resolve();
    });
    let isUpdate = true;

    try {
        fsBase.accessSync(thisProject);
    } catch(e) {
        isUpdate = false;
    }

    if (!isUpdate) {
        console.log('building...');

        promise = promise.then(() => {
            return new Promise((resolve, reject) => {
                fs.copy(baseProject, thisProject, {
                    filter: (file) => {
                        for (const name in configs) {
                            if (file.indexOf('request.js') > -1 || file.indexOf('node_modules') > -1) {
                                return false
                            }

                            if (file.indexOf(name) > -1) {
                                return false
                            }
                        }

                        return true
                    }
                }, (err) => {
                    if (err) {
                        throw err;
                    }

                    const file = thisProject + 'package.json';
                    fs.readJson(file, function(err, data) {
                        if (err) {
                            throw err
                        }

                        data.projectname = projectName;

                        fs.outputJson(file, data, function (err) {
                            if (err) {
                                throw err
                            }

                            resolve()
                        })
                    })
                })
            })
        }).then(() => {
            console.log('cnpm install...');

            return new Promise((resolve, reject) => {
                const cmdArr = [];
                cmdArr.push('cd ' + thisProject);
                cmdArr.push('cnpm install')
                cmdArr.push('cd ../..')
                exec(cmdArr.join(';'), (err) => {
                    if (err) {
                        throw err
                    }
                    console.log('npm installed');

                    // console.log('build success!')
                    resolve()
                })
            })
        })
    }

    promise = promise.then(() => {
        return new Promise((resolve, reject) => {
            const cmdArr = [];
            let oldData = {};
            const reactScriptsPath = thisProject + 'node_modules/react-scripts/';

            for (const name in configs) {
                cmdArr.push('cp ' + baseProject + name + ' ' + reactScriptsPath + configs[name]);
            }

            if (isUpdate) {
                cmdArr.push('cp ' + baseProject + 'package.json ' + thisProject + 'package.json');
                cmdArr.push('cp ' + baseProject + 'server.js ' + thisProject + 'server.js');

                const file = thisProject + 'package.json';
                oldData = fs.readJsonSync(file);
            }

            exec(cmdArr.join(';'), (err) => {
                if (err) {
                    throw err
                }

                if (isUpdate) {
                    const file = thisProject + 'package.json';
                    fs.readJson(file, function(err, data) {
                        if (err) {
                            throw err
                        }

                        const result = {};

                        merge(result, oldData, data, {
                            projectname: projectName
                        }, {
                            host: oldData.host
                        })

                        fs.outputJson(file, result, function (err) {
                            if (err) {
                                throw err
                            }

                            resolve()
                        })
                    })
                } else {
                    resolve()
                }
            })
        })
    })

    promise = promise.then(() => {
       // ended = true;

        const time = ' 打包时间: ' + (+new Date() - startTime) / 1000;
        console.log(chalk.green(isUpdate ? '更新成功!' : '构建成功' + time))
    })

}else{
    console.log('请输入项目名称');
}