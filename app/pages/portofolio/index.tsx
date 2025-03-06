import { DataTable } from "./data-table";

export default function Portofolio() {
	return (
		<>
			<section className=" max-w-7xl w-full flex items-center  mx-auto bg-gradient-to-b from-gray-800 to-purple-400/20 max-h-40 px-5 rounded ">
				<div className="flex items-center justify-between w-full p-4 rounded">
					<div>
						<h2 className="text-sm">My Deposits</h2>
						<p className=" text-5xl font-semibold">$0.00</p>
					</div>
					<div className="rounded-lg max-w-sm w-full shadow p-4 bg-gradient-to-b from-gray-800 to-purple-400/20">
						<h4 className="text-sm">Net APY</h4>
						<p className="text-xl">0.00%</p>
					</div>
				</div>
			</section>
			<section className="max-w-7xl mt-5 w-full mx-auto bg-neutral-500/20 text-white p-5 rounded-lg">
				<DataTable />
			</section>
		</>
	);
}
