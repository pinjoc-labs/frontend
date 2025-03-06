import { cn } from "~/lib/utils";

export type ItemClobProps = {
	apy: string;
	collateral: string;
	type: string;
};

export default function ItemClob({ apy, collateral, type }: ItemClobProps) {
	const handleButtonClick = () => {
		console.log(apy, collateral);
	};
	return (
		<button
			type="button"
			onClick={handleButtonClick}
			className={cn(
				"w-full my-[3px] text-sm px-2 py-[2px] flex items-center justify-between",
				type === "borrow" ? "bg-green-500/10" : "bg-red-500/10",
			)}
		>
			<span
				className={cn(
					type === "borrow"
						? "text-green-500 hover:font-bold"
						: "text-red-500 hover:font-bold",
				)}
			>
				{`${apy}%`}
			</span>
			<span className="text-white bg-transparent border-none outline-none hover:font-bold">
				{collateral}
			</span>
		</button>
	);
}
