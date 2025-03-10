import { useAccount } from "wagmi";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroupItem, RadioGroup } from "~/components/ui/radio-group";
import { cn } from "~/lib/utils";
import useMaturityStore from "../states/maturity-state";
import { useSummary } from "../data/get-summary";
import { useEffect, useState } from "react";
import { useBalance } from "~/hooks/use-balance";
import ConnectWallet from "~/components/derived/wagmi/button-connect";

export default function FormSupply() {
	const { isConnected, address } = useAccount();
	const { isMarket, rate: currentRate, setStatusMarket } = useMaturityStore();

	const { DebtTokenSymbol, DebtTokenAddress } = useSummary();

	const [rate, setRate] = useState(0);
	const [amount, setAmount] = useState(0);

	useEffect(() => {
		setRate(currentRate);
	}, [currentRate]);

	const handleSelect = (value: string) => {
		if (value === "market") {
			setStatusMarket(true);
		} else {
			setStatusMarket(false);
		}
	};
	const { balance } = useBalance(address!, DebtTokenAddress as `0x${string}`);

	return (
		<Card className="bg-transparent border-0 p-4 rounded-none">
			<CardHeader className="px-0 py-2">
				<CardTitle>
					<RadioGroup
						value={isMarket ? "market" : "limit"}
						onValueChange={handleSelect}
						className="gap-4"
					>
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
					<p className="text-base text-white font-semibold">{`${balance ?? 0} ${DebtTokenSymbol}`}</p>
				</div>
				<br />
				<div className="flex items-center justify-between border-b border-gray-600 pb-1">
					<Label className="text-sm text-gray-400" htmlFor="fixed-rate-supply">
						Fixed Rate
					</Label>
					<div className="w-full flex-1" />
					<Input
						id="fixed-rate-supply"
						value={rate}
						type="number"
						onChange={(e) => setRate(Number(e.target.value))}
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
						type="number"
						id="supply-supply"
						value={amount}
						onChange={(e) => {
							if (+e.target.value > (balance || 0)) return;
							setAmount(Number(e.target.value));
						}}
						className="w-36 text-right border-0 text-base text-white font-semibold bg-transparent"
					/>
					<span className="text-base text-white font-semibold">
						{DebtTokenSymbol}
					</span>
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
				{isConnected ? (
					<Button className="rounded-xs w-full">Place Order</Button>
				) : (
					<div className="flex items-center justify-center">
						<ConnectWallet className="rounded-xs w-full flex-1" />
					</div>
				)}
			</CardFooter>
		</Card>
	);
}
