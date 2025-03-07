import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroupItem, RadioGroup } from "~/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { cn } from "~/lib/utils";

export function ActionTab() {
	return (
		<Tabs
			defaultValue="supply"
			className="w-full h-full rounded-none bg-transparent"
		>
			<TabsList className="grid w-full grid-cols-2 rounded-none p-0 h-14 bg-transparent border-b border-gray-600">
				<TabsTrigger
					className={cn(
						"bg-transparent h-full rounded-none text-gray-700",
						"data-[state=active]:bg-gray-800",
						"data-[state=active]:font-semibold",
						"data-[state=active]:text-white",
					)}
					value="supply"
				>
					Supply
				</TabsTrigger>
				<TabsTrigger
					className={cn(
						"bg-transparent h-full rounded-none text-gray-700",
						"data-[state=active]:bg-gray-800",
						"data-[state=active]:font-semibold",
						"data-[state=active]:text-white",
					)}
					value="borrow"
				>
					Borrow
				</TabsTrigger>
			</TabsList>
			<TabsContent className="bg-transparent" value="supply">
				<Card className="bg-transparent border-0 p-4 rounded-none">
					<CardHeader className="px-0 py-2">
						<CardTitle>
							<RadioGroup defaultValue="market" className="gap-4">
								<div className="flex items-center gap-6">
									<div className="flex items-center space-x-3">
										<RadioGroupItem
											value="market"
											id="market"
											className="h-4 w-4 border-2 border-primary text-primary ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
										/>
										<Label
											htmlFor="market"
											className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										>
											Market
										</Label>
									</div>

									<div className="flex items-center space-x-3">
										<RadioGroupItem
											value="limit"
											id="limit"
											className="h-4 w-4 border-2 border-primary text-primary ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
										/>
										<Label
											htmlFor="limit"
											className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										>
											Limit
										</Label>
									</div>
								</div>
							</RadioGroup>
						</CardTitle>
					</CardHeader>
					<CardContent className="px-0 py-4">
						<div className="flex items-center justify-between border-b border-gray-600 pb-1">
							<p className="text-sm text-gray-400">Available On Wallet</p>
							<p className="text-base text-white font-semibold">387343 USDC</p>
						</div>
						<br />
						<div className="flex items-center justify-between border-b border-gray-600 pb-1">
							<Label
								className="text-sm text-gray-400"
								htmlFor="fixed-rate-supply"
							>
								Fixed Rate
							</Label>
							<div className="w-full flex-1" />
							<Input
								id="fixed-rate-supply"
								value="6.5"
								className="w-36 text-right border-0 text-base text-white font-semibold bg-transparent"
							/>
							<span className="text-base text-white font-semibold">%</span>
						</div>
						<br />
						<div className="flex items-center justify-between border-b border-gray-600">
							<Label className="text-sm text-gray-400" htmlFor="suppply-supply">
								Supply Amount
							</Label>
							<div className="w-full flex-1" />
							<Input
								id="supply-supply"
								value="1234"
								className="w-36 text-right border-0 text-base text-white font-semibold bg-transparent"
							/>
							<span className="text-base text-white font-semibold">USDC</span>
						</div>
						<div className="w-full flex justify-end">
							<Button
								className={cn(
									"rounded-xs text-xs px-1 py-0 font-normal bg-transparent text-gray-300",
									"hover:bg-gray-700 hover:underline",
								)}
							>
								Max
							</Button>
						</div>
						<br />
					</CardContent>
					<CardFooter className="p-0">
						<Button className="rounded-xs w-full">Place Order</Button>
					</CardFooter>
				</Card>
			</TabsContent>

			<TabsContent className="bg-transparent" value="borrow">
				Ongoing
			</TabsContent>
		</Tabs>
	);
}
