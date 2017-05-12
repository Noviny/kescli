#! /usr/bin/env node

const fs = require('fs');
const path = require('path');

const baseDirs = [
    'models',
    'routes',
    'updates',
    'templates',
]

const nestedDirs = [
    'routes/views',
    'templates/views',
];

const neededFiles = [
    'keystone.js',
    'package.json',
    '.gitignore',
    'updates/0.0.1-first-user.js',
    'routes/index.js',
    'routes/views/index.js',
    'models/User.js',
    'templates/views/index.pug'
]

function copyFile(src, dest) {
    return new Promise((resolve, reject) => {
        let readStream = fs.createReadStream(src);

        readStream.once('error', (err) => {
            reject(err);
        });

        readStream.once('end', () => {
            resolve();
        });

        readStream.pipe(fs.createWriteStream(dest));
    })
}

const makeNewDir = (newDir) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(newDir, err => {
            if (err) return reject(err);
            resolve();
        });
    });
};

const allThatSetup = () => {
    const baseDir = path.join(process.env.PWD, process.argv[2]);

    fs.access(baseDir, (err) => {
      if(err.errno !== -2) throw new Error('The directory already exists! This process would overwrite it.')
      makeNewDir(baseDir)
        .then(() => baseDirs.map(dir => {
            const newDir = path.join(baseDir, dir);
            return makeNewDir(newDir)
        }))
        .then((res) => Promise.all(res))
        .then(() => nestedDirs.map(dir => {
            const newDir = path.join(baseDir, dir);
            return makeNewDir(newDir)
        }))
        .then((res) => Promise.all(res))
        .then(() => neededFiles.map(fileName => {
            const fileToCopy = path.join(__dirname, 'node_modules/minimum-viable-keystone', fileName)
            const newFile = path.join(baseDir, fileName);
            return copyFile(fileToCopy, newFile);
        }))
        .then((res) => Promise.all(res))
        .then(() => console.log('finished'))
        .catch(err => console.log('something went wrong', err))
    });
}

allThatSetup();
