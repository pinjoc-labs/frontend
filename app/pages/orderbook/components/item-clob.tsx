import { cn } from "~/lib/utils";
import type { OrderType } from "../types/clob.type";
import useMaturityStore from "../states/maturity-state";
import { formatUSD } from "~/utils/helper";

export default function ItemClob(props: OrderType) {
	const { setAmount, setRate, setStatusMarket } = useMaturityStore();
	const handleButtonClick = () => {
		setAmount(props.AvailableToken);
		setRate(props.Rate);
		setStatusMarket(false);
	};
	return (
		<button
			type="button"
			onClick={handleButtonClick}
			className={cn(
				"w-full my-[3px] text-sm px-3 py-[2px] flex items-center relative justify-between"
			)}
		>
			<div className={cn(
				"absolute bottom-0 left-0 top-0 bg-rose-500/10 transition-all group-hover:bg-rose-500/20",
				props.OrderType.toLowerCase() === "lend"
					? "bg-green-500/10"
					: "bg-red-500/10",
			)}
				style={{
					width: `${(props.AvailableToken / 300_000) * 100}%`,
				}} />
			<span
				className={cn(
					props.OrderType.toLowerCase() === "lend"
						? "text-green-500 hover:font-bold"
						: "text-red-500 hover:font-bold",
				)}
			>
				{`${props.Rate}%`}
			</span>
			<span className="text-white bg-transparent border-none outline-none hover:font-bold">
				{formatUSD(props.AvailableToken)}
			</span>
		</button>
	);
}
