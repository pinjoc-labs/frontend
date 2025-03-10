import { separateOrders } from "~/utils/helper";
import { useClob } from "../data/get-clob";
import { useSummary } from "../data/get-summary";
import type { OrderType } from "../types/clob.type";
import ItemClob from "./item-clob";
import { SelectMaturity } from "./maturity-select";
import useMaturityStore from "../states/maturity-state";
import { useEffect, useState } from "react";

export default function Orderbook() {
	const { DebtTokenAddress, CollateralAddress } = useSummary();
	const {
		bestRate,
		maturity,
		fetchMaturities,
		setAmount,
		setRate,
		setBestAmount,
	} = useMaturityStore();
	const { data } = useClob({
		collateral_address: CollateralAddress,
		debt_token_address: DebtTokenAddress,
		maturity: maturity || "MAY 2025",
	});

	const [dataBorrow, setDataBorrow] = useState<OrderType[]>([]);
	const [dataLend, setDataLend] = useState<OrderType[]>([]);
	const [bestRates, setBestRates] = useState<OrderType | null>(null);

	useEffect(() => {
		fetchMaturities(CollateralAddress, DebtTokenAddress);
	}, [CollateralAddress, DebtTokenAddress]);

	useEffect(() => {
		const indexBestRate = (data || []).findIndex((item: OrderType) => {
			return item.Rate === bestRate;
		});

		if (indexBestRate > -1) {
			const separateData = (data || []).splice(indexBestRate, 1);
			if (separateData.length > 0) {
				setBestRates(separateData[0]);
				setAmount(separateData[0].AvailableToken);
				setRate(separateData[0].Rate);
				setBestAmount(separateData[0].AvailableToken);
			}
		}

		const { DataBorrow, DataLend } = separateOrders(data);
		setDataLend(DataLend);
		setDataBorrow(DataBorrow);
	}, [data, maturity]);

	return (
		<div className="flex flex-col h-full">
			<div className="p-2 border-b h-20 flex items-center justify-center border-gray-600 shadow-md">
				<h2 className="text-white text-xl font-semibold flex gap-2 items-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<title>Order Book</title>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M4 19l16 0" />
						<path d="M4 15l4 -6l4 2l4 -5l4 4" />
					</svg>
					<span>Order Book</span>
				</h2>
			</div>
			<SelectMaturity />
			<div className="flex px-3 w-full py-2 justify-between border-b border-gray-600 shadow-md text-gray-100 font-semibold text-xs">
				<span>APY(%)</span>
				<span>Amount (USDC)</span>
			</div>
			<div className="flex flex-col justify-end h-full">
				<div className="flex flex-1 h-fit flex-col justify-end overflow-y-hidden">
					{(dataLend || []).map((item: OrderType) => (
						<ItemClob key={item.Rate} {...item} />
					))}
				</div>
				<div className="bg-gray-700 my-[3px] ">
					<div className="w-full text-sm px-3 py-[2px] tex-base font-semibold flex items-center justify-between">
						{bestRates ? <span>{`${bestRates.Rate} %`}</span> : <span />}
					</div>
				</div>
				<div className="flex flex-1 h-fit flex-col justify-start overflow-y-hidden">
					{(dataBorrow || []).map((item: OrderType) => (
						<ItemClob key={item.Rate} {...item} />
					))}
				</div>
			</div>
		</div>
	);
}
