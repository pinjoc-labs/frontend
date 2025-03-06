import Orderbook from "./components/orderbook";

export default function OrderbookPage() {
	return (
		<div className="grid grid-flow-row-dense grid-cols-5 grid-rows-[8rem_auto] h-[calc(100vh-8rem)]">
			<div className="col-span-5 h-[8rem] border-b border-gray-600 p-4">
				Summary
			</div>
			<div className="col-span-3 grid grid-cols-1 grid-rows-5">
				<div className="row-span-3 p-4">Chart</div>
				<div className="p-4 border-t border-gray-600">Position</div>
			</div>
			<div className="border-x border-x-gray-600">
				<Orderbook />
			</div>
			<div className="p-4">Form Order</div>
		</div>
	);
}
