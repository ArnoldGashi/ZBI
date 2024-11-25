import { HierarchyNode } from './model/HierarchyNode';
import { renderTreeTable } from './visualization/treeLayout';

// const data: HierarchyNode[] = [
// 	{
// 		name: 'Q1',
// 		children: [
// 			{ name: 'Jan', value: 25.1 },
// 			{ name: 'Feb', value: 73.8 },
// 			{ name: 'Mar', value: 24.8 },
// 		],
// 	},
// 	{
// 		name: 'Q2',
// 		children: [
// 			{ name: 'Jan', value: 46.4 },
// 			{ name: 'May', value: 51.3 },
// 			{ name: 'Jun', value: 42.7 },
// 		],
// 	},
// 	{
// 		name: 'Q3',
// 		children: [
// 			{ name: 'Jul', value: 146.3 },
// 			{ name: 'Aug', value: 51.6 },
// 			{ name: 'Sep', value: 78.2 },
// 		],
// 	},
// 	{
// 		name: 'Q4',
// 		children: [
// 			{ name: 'Oct', value: 115.5 },
// 			{ name: 'Nov', value: 24.8 },
// 			{ name: 'Dec', value: 97.2 },
// 		],
// 	},
// ];

const data: HierarchyNode[] = [
	{
		name: '2022',
		children: [
			{
				name: 'Q1',
				children: [
					{ name: 'Jan', value: 25.1 },
					{ name: 'Feb', value: 73.8 },
					{ name: 'Mar', value: 24.8 },
				],
			},
			{
				name: 'Q2',
				children: [
					{ name: 'Apr', value: 46.4 },
					{ name: 'May', value: 24.3 },
					{ name: 'Jun', value: 42.7 },
				],
			},
			{
				name: 'Q3',
				children: [
					{ name: 'Jul', value: 46.4 },
					{ name: 'Aug', value: 24.3 },
					{ name: 'Sep', value: 42.7 },
				],
			},
			{
				name: 'Q4',
				children: [
					{ name: 'Oct', value: 115.5 },
					{ name: 'Nov', value: 24.8 },
					{ name: 'Dec', value: 97.2 },
				],
			},
		],
	},
	{
		name: '2023',
		children: [
			{
				name: 'Q1',
				children: [
					{ name: 'Jan', value: 22.5 },
					{ name: 'Feb', value: 74.8 },
					{ name: 'Mar', value: 27.8 },
				],
			},
			{
				name: 'Q2',
				children: [
					{ name: 'Apr', value: 99.4 },
					{ name: 'May', value: 23.2 },
					{ name: 'Jun', value: 64.7 },
				],
			},
			{
				name: 'Q3',
				children: [
					{ name: 'Jul', value: 43.6 },
					{ name: 'Aug', value: 64.3 },
					{ name: 'Sep', value: 12.7 },
				],
			},
			{
				name: 'Q4',
				children: [
					{ name: 'Oct', value: 185.2 },
					{ name: 'Nov', value: 64.6 },
					{ name: 'Dec', value: 37.6 },
				],
			},
		],
	},
	{
		name: '2024',
		children: [
			{
				name: 'Q1',
				children: [
					{ name: 'Jan', value: 43.2 },
					{ name: 'Feb', value: 51.9 },
					{ name: 'Mar', value: 59.7 },
				],
			},
			{
				name: 'Q2',
				children: [
					{ name: 'Apr', value: 94.4 },
					{ name: 'May', value: 43.5 },
					{ name: 'Jun', value: 14.7 },
				],
			},
			{
				name: 'Q3',
				children: [
					{ name: 'Jul', value: 45.6 },
					{ name: 'Aug', value: 34.3 },
					{ name: 'Sep', value: 12.2 },
				],
			},
			{
				name: 'Q4',
				children: [
					{ name: 'Oct', value: 115.2 },
					{ name: 'Nov', value: 46.1 },
					{ name: 'Dec', value: 39.6 },
				],
			},
		],
	},
];

window.treeData = data;
renderTreeTable(window.treeData);
