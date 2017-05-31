'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (_ref) {
	var t = _ref.types;

	return {
		visitor: {
			ExpressionStatement: function ExpressionStatement(path, state) {
				path.traverse(ModifyInitObject, state.opts);
			}
		}
	};
};

// A plugin is just a function
var ModifyInitObject = {
	ObjectProperty: function ObjectProperty(path, state) {
		if (path.node.key.name === 'name') path.node.value.value = state.projectName;
		if (state.starter !== 'mvk' && (path.node.key.name === 'views' || path.node.key.value === 'view engine')) {
			path.remove();
		}
	}
};
