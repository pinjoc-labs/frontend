export interface IHistory {
	id: string;
	type: "SUPPLY" | "BORROW";
	token: string;
	blockNumber: string;
	hash: string;
	timestamp: number;
}
