const path = require('path');
const fs = require('fs');
const spawn = require('child_process').spawn;

async function checkDestinationClear(destination) {
	console.log('destination', destination);
	return new Promise((resolve, reject) => {
		fs.access(destination, err => {
			if (!err) {
				return reject(
					new Error({
						reason: 'destination directory already exists.',
					})
				);
			}
			if (err.errno !== -2) return reject(new Error(err));
			return resolve();
		});
	});
}

const getOptions = (projectName, starter) => {
	const parseMain = path.join(__dirname, './parseMain');
	return JSON.stringify({
		plugins: [
			[
				parseMain,
				{
					projectName,
					starter,
				},
			],
		],
	});
};

async function makeBabelRC(projectName, starter) {
	const fileContents = getOptions(projectName, starter);
	const babelPath = path.join(__dirname, '.babelrc');
	return new Promise((resolve, reject) => {
		fs.writeFile(babelPath, fileContents, (err, res) => {
			if (err) reject(err);
			resolve(err);
		});
	});
}

async function removeBabelRC() {
	const babelPath = path.join(__dirname, '.babelrc');
	return new Promise((resolve, reject) => {
		fs.unlink(babelPath, err => {
			if (err) reject(err);
			resolve();
		});
	});
}

const copyFiles = (origin, destination) => {
	return new Promise((resolve, reject) => {
		const babel = spawn('babel', [origin, '-d', destination]);
		babel.stderr.on('data', data => reject(new Error({ err: data })));
		babel.on('close', () => {
			resolve();
		});
	});
};

// We need to subdivide this into different structures
// copy src/base to it
// then apply src/mvk || then apply src/reactSPA
// Or other strategy to parse out files with least interactions

async function makeTheFiles(projectName, destination, starter) {
	await checkDestinationClear(destination);
	await makeBabelRC(projectName, starter);

	const origin = path.join(__dirname, 'src');

	await copyFiles(origin, destination);
	await removeBabelRC();
	console.log('finished up');
}

module.exports = makeTheFiles;
