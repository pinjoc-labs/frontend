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

export function getMonthRange(
	range: string,
): { year: number; month: string }[] {
	const [start, end] = range.split(" ~ ");
	const months: string[] = [
		"JAN",
		"FEB",
		"MAR",
		"APR",
		"MAY",
		"JUN",
		"JUL",
		"AUG",
		"SEP",
		"OCT",
		"NOV",
		"DEC",
	];

	const [startMonth, startYear] = start.split(" ");
	const [endMonth, endYear] = end.split(" ");

	let startIdx: number = months.indexOf(startMonth);
	const endIdx: number = months.indexOf(endMonth);
	let currentYear: number = Number.parseInt(startYear, 10);
	const endYearNum: number = Number.parseInt(endYear, 10);

	const result: { year: number; month: string }[] = [];

	while (
		currentYear < endYearNum ||
		(currentYear === endYearNum && startIdx <= endIdx)
	) {
		result.push({ year: currentYear, month: months[startIdx] });

		startIdx++;
		if (startIdx === 12) {
			startIdx = 0;
			currentYear++;
		}
	}

	return result;
}

export const formatUSD = (value: number) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(value);
};
