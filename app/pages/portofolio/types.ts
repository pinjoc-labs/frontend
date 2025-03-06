export type ICollection = {
	id: number;
	asset: string;
	apy: string;
	borrowed: string;
	maturity: string;
	liquidationRisk: string;
	colleteral: string;
};

export type ISupply = {
	id: number;
	asset: string;
	apy: string;
	maturity: string;
	defaultRisk: string;
	supplied: string;
	earned: string;
};
