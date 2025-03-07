import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { maturityList } from "../data/maturity-list";

export function SelectMaturity() {
	return (
		<Select>
			<SelectTrigger className="w-full h-12 text-white rounded-none border-b border-gray-600 m-0">
				<SelectValue placeholder="Select Maturity" />
			</SelectTrigger>
			<SelectContent className="p-2">
				<SelectGroup>
					<SelectLabel>Select Maturity</SelectLabel>
					{(maturityList || []).map((data) => (
						<SelectItem
							key={`${data.month}${data.year}`}
							value={`${data.month}${data.year}`}
						>{`MATURITY ${data.month} ${data.year}`}</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
