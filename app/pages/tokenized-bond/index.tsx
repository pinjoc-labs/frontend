import { useTokenizedbond } from "~/hooks/use-tokenizedbond";
import { DataTable } from "./data-table";
import { columns } from "./column";

export default function TokenizedBond() {
	const { isTokenizedbondLoading, tokenizedbonds } = useTokenizedbond();
	return (
		<section className="max-w-7xl w-full mx-auto text-white p-5 rounded-2xl bg-purple-400/10 bg-clip-padding backdrop-filter backdrop-blur-lg border border-purple-400/20 shadow-lg my-4">
			<DataTable
				columns={columns}
				data={tokenizedbonds!}
				isLoading={isTokenizedbondLoading}
			/>
		</section>
	);
}
