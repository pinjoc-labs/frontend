import { useAvailableTokens } from "~/hooks/use-available-tokens";
import { DataTable } from "./data-table";
import { columns } from "./column";

export default function BorrowLanding() {
	const { availableTokens, isAvailableTokenLoading } = useAvailableTokens();
	return (
		<section className="max-w-5xl w-full mx-auto bg-purple-500/20 text-white p-5 rounded-lg">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold">Borrow/Lend</h1>
				<div className="flex gap-8">
					<div>
						<div className="text-sm text-muted-foreground">Supplied</div>
						<div className="text-xl font-bold">$9.046M</div>
					</div>
					<div>
						<div className="text-sm text-muted-foreground">Borrowed</div>
						<div className="text-xl font-bold">$4.892M</div>
					</div>
				</div>
			</div>
			<DataTable
				columns={columns}
				data={availableTokens!}
				isLoading={isAvailableTokenLoading}
			/>
		</section>
	);
}
