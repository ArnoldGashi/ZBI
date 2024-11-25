import * as d3 from 'd3';
import { HierarchyNode } from '../model/HierarchyNode';
import { calculateNodeSum } from '../util/calculation';

// Global variables for font settings
let currentFontSize = '16px';
let currentFontFamily = 'Arial';

// Function to dynamically assign parent property to the dataset
function assignParent(data: HierarchyNode[], parent: HierarchyNode | null = null) {
	data.forEach((node) => {
		node.parent = parent;
		if (node.children) {
			assignParent(node.children, node);
		}
	});
}

// Toggle inversion for a node
function toggleInvert(name: string, parent: HierarchyNode | null, data: HierarchyNode[]) {
	console.log(`Toggle Invert called for node: ${name}, parent: ${parent ? parent.name : 'null'}`);

	function traverseAndToggle(node: HierarchyNode, invertState: boolean) {
		node.inverted = invertState;
		if (node.children) {
			node.children.forEach((child) => traverseAndToggle(child, invertState));
		}
	}

	function findAndToggle(node: HierarchyNode): boolean {
		if (node.name === name && (!parent || node.parent === parent)) {
			const newInvertState = !(node.inverted || false);
			traverseAndToggle(node, newInvertState);
			return true;
		}

		return node.children?.some(findAndToggle) || false;
	}

	data.some(findAndToggle);

	calculateNodeSum(d3.hierarchy(data[0]));
	renderTreeTable(data);
}

// Toggle skipping for a node
function toggleSkip(name: string, parent: HierarchyNode | null, data: HierarchyNode[]) {
	console.log(`Toggle Skip called for node: ${name}, parent: ${parent ? parent.name : 'null'}`);

	function traverseAndToggle(node: HierarchyNode, skipState: boolean) {
		node.skipped = skipState;
		if (node.children) {
			node.children.forEach((child) => traverseAndToggle(child, skipState));
		}
	}

	function findAndToggle(node: HierarchyNode): boolean {
		if (node.name === name && (!parent || node.parent === parent)) {
			const newSkipState = !(node.skipped || false);
			traverseAndToggle(node, newSkipState);
			return true;
		}

		return node.children?.some(findAndToggle) || false;
	}

	data.some(findAndToggle);

	calculateNodeSum(d3.hierarchy(data[0]));
	renderTreeTable(data);
}

// Expose toggle functions globally for button handlers
window.toggleInvert = toggleInvert;
window.toggleSkip = toggleSkip;

// Add font settings to customize the table
function addFontSettings() {
	const controls = d3
		.select('body')
		.insert('div', 'table')
		.attr('id', 'controls')
		.style('margin', '10px auto')
		.style('text-align', 'center');

	// Font size controls
	controls.append('label').text('Font Size: ');
	controls
		.append('select')
		.attr('id', 'fontSizeSelect')
		.on('change', () => {
			currentFontSize = (document.getElementById('fontSizeSelect') as HTMLSelectElement).value;
			applyTableStyles();
		})
		.selectAll('option')
		.data(['12px', '14px', '16px', '18px', '20px'])
		.enter()
		.append('option')
		.text((d) => d)
		.attr('value', (d) => d)
		.property('selected', (d) => d === currentFontSize);

	// Font family controls
	controls.append('label').text(' Font Family: ');
	controls
		.append('select')
		.attr('id', 'fontFamilySelect')
		.on('change', () => {
			currentFontFamily = (document.getElementById('fontFamilySelect') as HTMLSelectElement).value;
			applyTableStyles();
		})
		.selectAll('option')
		.data(['Arial', 'Verdana', 'Times-New-Roman', 'Courier-New'])
		.enter()
		.append('option')
		.text((d) => d)
		.attr('value', (d) => d)
		.property('selected', (d) => d === currentFontFamily);

	// Apply the default classes to the table
	d3.select('table').attr('class', `font-size-${currentFontSize} font-family-${currentFontFamily}`);
}

// Apply the font styles to the table
function applyTableStyles() {
	// Add font size and family classes to the <table>
	d3.select('table').attr('class', `font-size-${currentFontSize} font-family-${currentFontFamily}`);
}

// Render the hierarchical tree table
export function renderTreeTable(data: HierarchyNode[]) {
	assignParent(data);

	if (!d3.select('#controls').node()) {
		addFontSettings();
	}

	d3.select('table').remove();

	const table = d3
		.select('body')
		.append('table')
		.style('border-collapse', 'collapse')
		.style('width', '80%')
		.style('max-width', '800px')
		.style('margin', '20px auto')
		.style('border', '1px solid black');

	// Apply font styles to the new table
	applyTableStyles();

	const thead = table.append('thead');
	thead
		.append('tr')
		.selectAll('th')
		.data(['', 'Accumulation'])
		.enter()
		.append('th')
		.text((d) => d)
		.style('border-bottom', '2px solid black')
		.style('text-align', (d) => (d === 'Accumulation' ? 'right' : 'left'))
		.style('padding', '10px')
		.style('font-weight', 'bold');

	const tbody = table.append('tbody');

	function renderRows(node: HierarchyNode, depth: number) {
		const hasChildren = !!node.children && node.children.length > 0;

		const row = tbody
			.append('tr')
			.attr('class', `row-${node.name} ${node.parent ? `child-of-${node.parent.name}` : ''}`)
			.style('cursor', hasChildren ? 'pointer' : 'default');

		row
			.append('td')
			.html(
				`<span style="margin-left: ${depth * 20}px; display: inline-block; width: 20px; text-align: center;">${
					hasChildren ? (node.collapsed ? '▶' : '▼') : ''
				}</span> ${node.name}
                <button 
                    style="margin-left: 10px; background-color: #007bff; color: white; border: none; padding: 3px 6px; border-radius: 3px; cursor: pointer;"
                    onclick="toggleInvert('${node.name}', ${
					node.parent ? `window.treeData.find(n => n.name === '${node.parent.name}')` : null
				}, window.treeData)">Invert</button>
                <button 
                    style="margin-left: 5px; background-color: #6c757d; color: white; border: none; padding: 3px 6px; border-radius: 3px; cursor: pointer;"
                    onclick="toggleSkip('${node.name}', ${
					node.parent ? `window.treeData.find(n => n.name === '${node.parent.name}')` : null
				}, window.treeData)">Skip</button>`
			)
			.style('text-decoration', node.skipped ? 'line-through' : 'none')
			.style('padding', '8px')
			.on('click', (event) => {
				if (!hasChildren || event.target.tagName === 'BUTTON') return;

				node.collapsed = !node.collapsed;

				renderTreeTable(data);
			});

		row
			.append('td')
			.text(calculateNodeSum(d3.hierarchy(node)).toFixed(1))
			.style('text-align', 'right')
			.style('padding', '8px');

		if (!node.collapsed && node.children) {
			node.children.forEach((child) => renderRows(child, depth + 1));
		}
	}

	data.forEach((node) => renderRows(node, 0));

	const totalRow = table.append('tfoot').append('tr');
	totalRow
		.append('td')
		.text('Total')
		.style('font-weight', 'bold')
		.style('text-align', 'left')
		.style('padding', '10px')
		.attr('colspan', '1')
		.style('border-top', '2px solid black');

	const totalValue = data.reduce((sum, node) => sum + calculateNodeSum(d3.hierarchy(node)), 0);

	totalRow
		.append('td')
		.text(totalValue.toFixed(1))
		.style('font-weight', 'bold')
		.style('text-align', 'right')
		.style('padding', '10px')
		.style('border-top', '2px solid black');
}

// Initialize tree data globally
window.treeData = [];
