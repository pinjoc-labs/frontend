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
