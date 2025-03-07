import { SelectMaturity } from "./components/maturity-select";
import Orderbook from "./components/orderbook";
import Summary from "./components/summary";

export default function OrderbookPage() {
	return (
		<div className="grid grid-flow-row-dense grid-cols-5 grid-rows-[6rem_auto] h-[calc(100vh-8rem)]">
			<div className="col-span-5 h-[6rem] flex items-center border-b border-gray-600 p-4">
				<Summary />
			</div>
			<div className="col-span-3 grid grid-cols-1 grid-rows-5">
				<div className="row-span-3 p-4">Chart</div>
				<div className="p-4 border-t border-gray-600">Position</div>
			</div>
			<div className="border-x border-x-gray-600">
				<SelectMaturity />
				<Orderbook />
			</div>
			<div>Form</div>
		</div>
	);
}
