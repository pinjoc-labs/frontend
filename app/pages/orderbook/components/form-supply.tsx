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
import { usePlaceOrder } from "~/hooks/use-place-order";
import { useApprove } from "~/hooks/use-approve";
import ConnectWallet from "~/components/derived/wagmi/button-connect";
import { extractMonthAndYear, formatUSD } from "~/utils/helper";
import { parseUnits } from "viem"
import { pinjocRouterAddress } from "~/abis/token-abi";

export default function FormSupply() {
	const balance = 12345;
	const { isConnected, address } = useAccount();
	const {
		isMarket,
		rate: currentRate,
		amount: maxAmount,
		setStatusMarket,
		maturity,
	} = useMaturityStore();

	const {
		DebtTokenAddress,
		CollateralAddress,
		DebtTokenSymbol,
		CollateralTokenSymbol,
	} = useSummary();

	const { placeOrder, isPlacing } = usePlaceOrder({
		onSuccess: (result) => {
			console.log("Order placed successfully:", result);
		},
		onError: (error) => {
			console.error("Error placing order:", error);
		},
	});

	const { approve, isApproving } = useApprove({
		onSuccess: (result) => {
			console.log("Approve successfully:", result);
		},
		onError: (error) => {
			console.error("Error approve:", error);
		},
	});

	const [rate, setRate] = useState<string>("");
	const [amount, setAmount] = useState<string>("");
	const [collateral, setCollateral] = useState(0);

	useEffect(() => {
		setRate(currentRate.toString());
	}, [currentRate]);

	const handleSelect = (value: string) => {
		if (value === "market") {
			setStatusMarket(true);
		} else {
			setStatusMarket(false);
		}
	};
	const handlePlaceOrder = async () => {
		const { month, year } = extractMonthAndYear(maturity || "");
		await approve({
			// amount: BigInt(amount) * BigInt(10 ** 6),
			amount: parseUnits(amount, 6),
			// spender: pinjocRouterAddress,
			spender: pinjocRouterAddress,
			address: DebtTokenAddress as `0x${string}`,
		});
		await placeOrder({
			debtToken: DebtTokenAddress as `0x${string}`,
			collateralToken: CollateralAddress as `0x${string}`,
			amount: parseUnits(amount, 6),
			collateralAmount: BigInt(0),
			// rate: BigInt(Math.floor(currentRate * 10 ** 16)),
			rate: parseUnits(rate, 16),
			maturity: BigInt(1748449527),
			maturityMonth: month,
			maturityYear: BigInt(Number(year)),
			lendingOrderType: 0,
		});
	};

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
					<p className="text-base text-white font-semibold">{`${formatUSD(balance, false)} ${DebtTokenSymbol}`}</p>
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
						onChange={(e) => setRate(e.target.value)}
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
						step="0.0001"
						min="0"
						onChange={(e) => {
							if (+e.target.value > balance) return;
							setAmount(e.target.value);
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
				<div className="flex justify-between items-center my-6">
					<Label htmlFor="autoroll">Auto-roll Supply</Label>
					<RadioGroup defaultValue="off" className="w-fit flex justify-end">
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="on" id="on" />
							<Label htmlFor="on">On</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="off" id="off" />
							<Label htmlFor="off">Off</Label>
						</div>
					</RadioGroup>
				</div>
				<br />
			</CardContent>
			<CardFooter className="p-0">
				{isConnected ? (
					<Button
						className="rounded-xs w-full cursor-pointer"
						onClick={() => handlePlaceOrder()}
					>
						{isPlacing || isApproving ? "Loading" : "Place Order"}
					</Button>
				) : (
					<div className=" w-full">
						<ConnectWallet className="rounded-xs w-full cursor-pointer" />
					</div>
				)}
			</CardFooter>
		</Card>
	);
}
