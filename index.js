#! /usr/bin/env node
const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;
const availableStarters = ['mvk', 'react-spa'];

const checkPath = dir => {
    return new Promise((resolve, reject) => {
        fs.access(dir, err => {
            if (!err) {
                console.log('problem of no error');
                return reject(
                    new Error({
                        reason: 'destination directory already exists.'
                    })
                );
            }
            if (err.errno !== -2) return reject(new Error(err));
            return resolve();
        });
    });
};

const copyFiles = (destination, origin) => {
    return new Promise((resolve, reject) => {
        const cp = spawn('cp', ['-r', origin, destination]);
        cp.stderr.on('data', data => reject(new Error({ err: data })));
        cp.on('close', () => {
            resolve();
        });
    });
};

const allThatSetup = (newDir, oldDir = 'mvk') => {
    if (availableStarters.indexOf(oldDir) < 0)
        return Promise.reject({
            reason: `Your starter choice must be from [${availableStarters}]`
        });
    const origin = path.join(__dirname, `src/${oldDir}`);
    const destination = path.join(process.env.PWD, newDir);
    const scriptPath = path.join(__dirname, 'scripts/mvk.bash');

    return checkPath(destination)
        .then(() => copyFiles(destination, origin))
        .then(
            console.log(
                `Completed Setting up your files. Run 'cd ${destination} && yarn' to complete your setup.`
            )
        )
        .catch(err => {
            console.error('There was an error setting up your project:');
            console.log(JSON.stringify(err));
            if (err && err.reason) console.error(err.reason);
            if (err && err.err) console.error(err.err);
            if (err && !err.reason && !err.err) console.log(err);
        });
};

allThatSetup(process.argv[2], process.argv[3]);
