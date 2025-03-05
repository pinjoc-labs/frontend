import { DataTable } from "./data-table";

export default function BorrowLanding() {
	return (
		<section className="max-w-5xl w-full mx-auto bg-neutral-900 text-white p-4">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold">Lend</h1>
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
			<DataTable />
		</section>
	);
}
