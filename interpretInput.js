const commander = require('commander');
const availableStarters = ['mvk', 'react-spa'];
const makeTheFiles = require('./makeTheFiles');
const path = require('path');

async function interpretInput(processArgs) {
	commander
		.arguments('<cmd> [env]')
		.action(function(cmd, env) {
			action = cmd;
			name = env;
		})
		.option('-s --starter [string]')
		.option('-p --path [string]')
		.parse(processArgs);

	if (!action) {
		return Promise.reject();
	}
	if (action !== 'new') {
		console.log(
			'v sorry but we currently only support building new projects.'
		);
		return Promise.reject();
	}
	const projectName = name || 'keystone-starter';
	const destination = path.join(
		process.env.PWD,
		commander.path || projectName
	);
	const starter = commander.starter || 'mvk';
	if (!availableStarters.includes(starter)) {
		console.log('We only have two starters right now, mvk and react-spa');
		process.exit(1);
	}
	console.log("We're going to go make the files now");

	return {
		projectName,
		destination,
		starter,
	};
}

module.exports = interpretInput;
