import { TokenIcon } from "~/components/derived/wagmi/token-icon";
import { useSummary } from "../data/get-summary";

export default function Summary() {
	const {
		LendingVault,
		BorrowVault,
		MaturityRange,
		RateRange,
		DebtTokenName,
		DebtTokenSymbol,
		DebtTokenIcon,
		CollateralTokenName,
		CollateralTokenSymbol,
		CollateralTokenIcon,
	} = useSummary();
	return (
		<div className="flex items-center justify-start gap-x-10">
			<div className="flex gap-x-6 items-center">
				<TokenIcon
					from={{
						token: DebtTokenName,
						imageUrl: DebtTokenIcon,
					}}
					to={{
						token: CollateralTokenName,
						imageUrl: CollateralTokenIcon,
					}}
				/>
				<h2 className="font-semibold text-xl">{`${DebtTokenSymbol}/${CollateralTokenSymbol}`}</h2>
			</div>
			<SummaryItem label="Lending Vault" value={String(LendingVault)} />
			<SummaryItem label="Borrow Vault" value={String(BorrowVault)} />
			<SummaryItem label="Maturity" value={MaturityRange} />
			<SummaryItem label="Rate" value={RateRange} />
		</div>
	);
}

const SummaryItem = ({ label, value }: { label: string; value: string }) => {
	return (
		<div className="flex flex-col gap-1">
			<p className="text-sm text-gray-400">{label}</p>
			<p className="text-base text-white font-semibold">{value}</p>
		</div>
	);
};
