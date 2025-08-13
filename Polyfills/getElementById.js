if (!document.getElementById) {
	document.getElementById = function (id) {
		function traverse(node) {
			if (node.id === id) return node;
			for (var i = 0; i < node.childNodes.length; i++) {
				var found = traverse(node.childNodes[i]);
				if (found) return found;
			}

			return null;
		}

		return traverse(document.body);
	};
}

// example usage
console.log(document.getElementById('myElementId')); // Assuming an element with id '
