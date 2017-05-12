#! /usr/bin/env node
const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;

const allThatSetup = () => {
    const originDir = path.join(__dirname, 'src/mvk');
    const newDir = path.join(process.env.PWD, process.argv[2]);
    const scriptPath = path.join(__dirname, 'scripts/mvk.bash');

    fs.access(newDir, err => {
        if (err.errno !== -2)
            throw new Error(
                'The directory already exists! This process would overwrite it.'
            );

        const cp = spawn('cp', ['-r', originDir, newDir]);
        cp.stderr.on('data', data => {
            console.log(`stderr: ${data}`);
        });

        cp.on('close', code => {
            console.log(
                `Completed Setting up your files. Run 'cd ${process.argv[2]} && yarn' to complete your setup.`
            );
        });
    });
};

allThatSetup();
