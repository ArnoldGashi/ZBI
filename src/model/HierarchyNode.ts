export interface HierarchyNode {
	name: string;
	value?: number;
	children?: HierarchyNode[];
	inverted?: boolean;
	skipped?: boolean;
	parent?: HierarchyNode | null;
	collapsed?: boolean | null;
}
