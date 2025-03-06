export default function Orderbook() {
	return (
		<div className="grid grid-flow-row-dense grid-cols-5 grid-rows-[8rem_auto]">
			<div className="col-span-5 h-[8rem] border-b border-gray-600">
				Summary
			</div>
			<div className="col-span-3 grid grid-cols-1 grid-rows-5">
				<div className="row-span-3">Chart</div>
				<div>Position</div>
			</div>
			<div className="border-x border-x-gray-600">Orderbook</div>
			<div>Form Order</div>
		</div>
	);
}
