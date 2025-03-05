export interface IBorrowLend {
	id: string;
	token: string;
	icon: string;
	lendApy: number;
	isPopular: boolean;
	supplied: {
		value: number;
		formatted: string;
		usdValue: string;
	};
	borrowed: {
		value: number;
		formatted: string;
		usdValue: string;
	};
}
