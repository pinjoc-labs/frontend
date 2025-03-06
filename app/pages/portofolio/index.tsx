import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { DataTable } from "./data-table";
import { columnsBorrow, columnsSupply } from "./column";
import { dataBorrow, dataLend } from "./dummy";

export default function Portofolio() {
	return (
		<>
			<section className=" max-w-7xl w-full flex items-center  mx-auto bg-gradient-to-b from-gray-800 to-purple-400/20 max-h-40 px-5 rounded mt-4">
				<div className="flex items-center justify-between w-full p-4 rounded">
					<div className="flex items-center gap-4">
						<div className="border-r border-gray-300 px-2">
							<h2 className="text-sm">Total Supply</h2>
							<p className=" text-xl font-semibold">$10.00</p>
						</div>
						<div className="border-r border-gray-300 px-2">
							<h2 className="text-sm">Total Borrow</h2>
							<p className=" text-xl font-semibold">$50.00</p>
						</div>
						<div className="px-2">
							<h2 className="text-sm">Assets</h2>
							<p className=" text-xl font-semibold">2</p>
						</div>
					</div>
					<div className="rounded-lg max-w-sm w-full shadow p-4 bg-gradient-to-b from-gray-800 to-purple-400/20 flex items-center gap-4">
						<div className=" px-2">
							<h4 className="text-sm">Net APY</h4>
							<p className="text-xl">4.00%</p>
						</div>
						<div className="px-2">
							<h4 className="text-sm">Health Factor</h4>
							<p className="text-xl text-green-400">4.99</p>
						</div>
					</div>
				</div>
			</section>
			<section className="max-w-7xl mt-8 w-full mx-auto text-white p-5 rounded-2xl bg-purple-400/10 bg-clip-padding backdrop-filter backdrop-blur-lg border border-purple-400/20 shadow-lg mb-4">
				<Tabs defaultValue="borrow">
					<TabsList className="bg-transparent">
						<TabsTrigger
							value="borrow"
							className="w-20 rounded-full border-none text-white hover:bg-purple-400/20 font-light cursor-pointer"
						>
							Borrow
						</TabsTrigger>
						<TabsTrigger
							value="lend"
							className="w-20 rounded-full border-none font-light text-white hover:bg-purple-400/20 cursor-pointer"
						>
							Lend
						</TabsTrigger>
					</TabsList>
					<TabsContent value="borrow">
						<DataTable columns={columnsBorrow} data={dataBorrow} />
					</TabsContent>
					<TabsContent value="lend">
						<DataTable columns={columnsSupply} data={dataLend} />
					</TabsContent>
				</Tabs>
			</section>
		</>
	);
}
