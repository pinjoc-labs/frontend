import type { OrdersType, OrderType } from "~/pages/orderbook/types/clob.type";

export const extractMonthAndYear = (m: string) => {
	const maturity = m.trim();
	const month = maturity.substring(0, 3).toUpperCase();
	const year = maturity.substring(3);

	return { month, year };
};

export function separateOrders(input: OrdersType) {
	const DataBorrow: OrdersType = [];
	const DataLend: OrdersType = [];

	(input || []).forEach((item: OrderType) => {
		const { OrderType } = item;

		if (OrderType === "LEND") {
			DataLend.push(item);
		} else if (OrderType === "BORROW") {
			DataBorrow.push(item);
		}
	});

	return { DataBorrow, DataLend };
}

export function getMaturityTimestamp(monthName: string, year: number): number {
	const monthNamesToNumbers: { [key: string]: number } = {
		JAN: 0,
		FEB: 1,
		MAR: 2,
		APR: 3,
		MAY: 4,
		JUN: 5,
		JUL: 6,
		AUG: 7,
		SEP: 8,
		OCT: 9,
		NOV: 10,
		DEC: 11,
	};
	const monthNumber: number = monthNamesToNumbers[monthName.toUpperCase()];
	const maturityDate: Date = new Date(year, monthNumber, 1);
	return Math.floor(maturityDate.getTime() / 1000);
}
