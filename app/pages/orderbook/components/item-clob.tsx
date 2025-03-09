import { cn } from "~/lib/utils";
import type { OrderType } from "../types/clob.type";

export default function ItemClob(props: OrderType) {
	const handleButtonClick = () => {
		console.log(props);
	};
	return (
		<button
			type="button"
			onClick={handleButtonClick}
			className={cn(
				"w-full my-[3px] text-sm px-3 py-[2px] flex items-center justify-between",
				props.OrderType.toLowerCase() === "lend"
					? "bg-green-500/10"
					: "bg-red-500/10",
			)}
		>
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
				{props.AvailableToken}
			</span>
		</button>
	);
}
