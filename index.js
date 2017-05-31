#! /usr/bin/env node
const path = require('path');
const interpretInput = require('./interpretInput');
const makeTheFiles = require('./makeTheFiles');
async function wrapper() {
	try {
		const { projectName, destination, starter } = await interpretInput(
			process.argv
		);
		await makeTheFiles(projectName, destination, starter);
		console.log('mischief managed');
	} catch (e) {
		console.log('we borked it');
		console.log(e);
	}
}

wrapper();
