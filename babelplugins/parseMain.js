// A plugin is just a function
const ModifyInitObject = {
	ObjectProperty(path, state) {
		if (path.node.key.name === 'name')
			path.node.value.value = state.projectName;
		if (
			state.starter !== 'mvk' &&
			(path.node.key.name === 'views' ||
				path.node.key.value === 'view engine')
		) {
			path.remove();
		}
	},
};

export default function({ types: t }) {
	return {
		visitor: {
			ExpressionStatement(path, state) {
				path.traverse(ModifyInitObject, state.opts);
			},
		},
	};
}
