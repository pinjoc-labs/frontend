import ItemClob, { type ItemClobProps } from "./item-clob";

const mockDataBorrow: ItemClobProps[] = [
	{ apy: "5.2", collateral: "1000", type: "borrow" },
	{ apy: "4.8", collateral: "750", type: "borrow" },
	{ apy: "6.1", collateral: "1200", type: "borrow" },
	{ apy: "5.5", collateral: "800", type: "borrow" },
];

const mockDataLend: ItemClobProps[] = [
	{ apy: "3.2", collateral: "500", type: "lend" },
	{ apy: "3.8", collateral: "600", type: "lend" },
	{ apy: "2.9", collateral: "400", type: "lend" },
	{ apy: "4.1", collateral: "650", type: "lend" },
	{ apy: "3.5", collateral: "550", type: "lend" },
	{ apy: "2.7", collateral: "350", type: "lend" },
];

export default function Orderbook() {
	return (
		<div className="flex flex-col h-full">
			<div className="p-2 border-b border-gray-600 shadow-md">
				<h2 className="text-white text-xl font-semibold">Order Book</h2>
			</div>
			<div className="flex px-2 w-full py-2 justify-between border-b border-gray-600 shadow-md text-gray-100 font-semibold text-xs">
				<span>APY(%)</span>
				<span>Amount (USDC)</span>
			</div>
			<div className="flex flex-col justify-end h-full">
				<div className="flex flex-1 h-fit flex-col flex-reverse justify-end overflow-y-hidden">
					{mockDataBorrow.map((item, index) => (
						<ItemClob key={index} {...item} />
					))}
				</div>
				<div className="bg-gray-700 my-[3px] ">
					<div className="w-full text-sm px-2 py-[2px] tex-base font-semibold flex items-center justify-between">
						<span>Spread</span>
						<span>6.5%</span>
					</div>
				</div>
				<div className="flex flex-1 h-fit flex-col justify-start overflow-y-hidden">
					{mockDataLend.map((item, index) => (
						<ItemClob key={index} {...item} />
					))}
				</div>
			</div>
		</div>
	);
}
