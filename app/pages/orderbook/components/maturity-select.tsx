import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import useMaturityStore from "../states/maturity-state";
import type { BestRateType } from "../types/best-rate.type";

export function SelectMaturity() {
	const { maturity, maturities, setMaturity } = useMaturityStore();

	return (
		<Select value={maturity || ""} onValueChange={(d) => setMaturity(d)}>
			<SelectTrigger className="w-full h-12 text-white rounded-none border-0 border-b border-gray-600 m-0">
				<SelectValue placeholder="Select Maturity" />
			</SelectTrigger>
			<SelectContent className="p-2">
				<SelectGroup>
					<SelectLabel>Select Maturity</SelectLabel>
					{(maturities || []).map((data: BestRateType) => (
						<SelectItem
							key={data.Maturity}
							value={data.Maturity}
						>{`MATURITY ${data.Maturity}`}</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
