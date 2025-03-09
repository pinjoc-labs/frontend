import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { cn } from "~/lib/utils";
import FormSupply from "./form-supply";
import FormBorrow from "./form-borrow";

export function ActionTab() {
	return (
		<Tabs
			defaultValue="supply"
			className="w-full h-full rounded-none bg-transparent"
		>
			<TabsList className="grid w-full grid-cols-2 rounded-none p-0 h-14 bg-transparent border-b border-gray-600">
				<TabsTrigger
					className={cn(
						"bg-transparent h-full rounded-none text-gray-700 flex items-center gap-1",
						"data-[state=active]:bg-gray-800",
						"data-[state=active]:font-semibold",
						"data-[state=active]:text-white",
					)}
					value="supply"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<title>Supply</title>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M15 11v.01" />
						<path d="M5.173 8.378a3 3 0 1 1 4.656 -1.377" />
						<path d="M16 4v3.803a6.019 6.019 0 0 1 2.658 3.197h1.341a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-1.342c-.336 .95 -.907 1.8 -1.658 2.473v2.027a1.5 1.5 0 0 1 -3 0v-.583a6.04 6.04 0 0 1 -1 .083h-4a6.04 6.04 0 0 1 -1 -.083v.583a1.5 1.5 0 0 1 -3 0v-2l0 -.027a6 6 0 0 1 4 -10.473h2.5l4.5 -3h0z" />
					</svg>
					<span>Supply</span>
				</TabsTrigger>
				<TabsTrigger
					className={cn(
						"bg-transparent h-full rounded-none text-gray-700 flex items-center gap-1",
						"data-[state=active]:bg-gray-800",
						"data-[state=active]:font-semibold",
						"data-[state=active]:text-white",
					)}
					value="borrow"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<title>Borrow</title>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M7 15h-3a1 1 0 0 1 -1 -1v-8a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v3" />
						<path d="M7 9m0 1a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1z" />
						<path d="M12 14a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
					</svg>
					<span>Borrow</span>
				</TabsTrigger>
			</TabsList>
			<TabsContent className="bg-transparent" value="supply">
				<FormSupply />
			</TabsContent>

			<TabsContent className="bg-transparent" value="borrow">
				<FormBorrow />
			</TabsContent>
		</Tabs>
	);
}
