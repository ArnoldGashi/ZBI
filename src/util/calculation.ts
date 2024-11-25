export function calculateNodeSum(node: any): number {
	// If the node is skipped, propagate to children and set value to 0
	if (node.data.skipped) {
		const children = node.children || node._children;
		if (children) {
			children.forEach((child: any) => {
				child.data.skipped = true;
				calculateNodeSum(child);
			});
		}
		node.data.calculatedValue = 0;
		return 0;
	}

	// Handle leaf nodes
	if (node.data.value !== undefined) {
		const value = node.data.inverted ? -node.data.value : node.data.value;
		node.data.calculatedValue = value;
		return value;
	}

	// Handle internal nodes (calculate sum of children)
	const children = node.children || node._children;
	if (children) {
		const sum = children.reduce((acc: number, child: any) => acc + calculateNodeSum(child), 0);
		node.data.calculatedValue = sum;
		return sum;
	}

	// Default case for nodes with no value or children
	node.data.calculatedValue = 0;
	return 0;
}
