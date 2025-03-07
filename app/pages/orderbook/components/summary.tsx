import { TokenIcon } from "~/components/derived/wagmi/token-icon";
const mockTokens = {
	ETH: {
		token: "ETH",
		imageUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
	},
	USDC: {
		token: "USDC",
		imageUrl: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
	},
};
export default function Summary() {
	return (
		<div className="flex items-center justify-start gap-x-12">
			<TokenIcon from={mockTokens.ETH} to={mockTokens.USDC} />
			<h2 className="font-semibold text-xl">ETH/USDC</h2>
			<SummaryItem label="Lending Vault" value="100,000,000" />
			<SummaryItem label="Borrow Vault" value="100,000,000" />
			<SummaryItem label="Maturity" value="100,000,000" />
			<SummaryItem label="Rate" value="100,000,000" />
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
