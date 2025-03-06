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
		<div className="flex items-center justify-start gap-x-4">
			<TokenIcon from={mockTokens.ETH} to={mockTokens.USDC} />
			<h2 className="font-semibold text-xl">ETH/USDC</h2>
		</div>
	);
}
