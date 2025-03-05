import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

const ConnectWallet = ({ className, ...props }: { className?: string }) => {
	return (
		<ConnectButton.Custom>
			{({
				account,
				chain,
				openAccountModal,
				openChainModal,
				openConnectModal,
				mounted,
			}) => {
				const ready = mounted && "loading";
				const connected = ready && account && chain;

				return (
					<div
						{...(!ready && {
							"aria-hidden": true,
							style: {
								opacity: 0,
								pointerEvents: "none",
								userSelect: "none",
							},
						})}
					>
						{(() => {
							if (!connected) {
								return (
									<Button
										className={cn(
											"group relative",
											"bg-primary text-primary-foreground",
											"rounded-md",
											className,
										)}
										onClick={openConnectModal}
										{...props}
									>
										Connect Wallet
										<div
											className={cn(
												"before:absolute before:inset-0",
												"before:rounded-[inherit]",
												"before:bg-[linear-gradient(45deg,transparent_5%,theme(colors.white/.3)_50%,transparent_50%,transparent_100%)]",
												"before:bg-[length:250%_250%,100%_100%]",
												"before:bg-[position:200%_0,0_0]",
												"before:bg-no-repeat",
												"before:[transition:background-position_0s_ease]",
												"group-hover:before:bg-[position:-100%_0,0_0]",
												"group-hover:before:duration-[2500ms]",
											)}
										/>
									</Button>
								);
							}
							if (chain.unsupported) {
								return (
									<button
										onClick={openChainModal}
										type="button"
										className={cn(
											"rounded-md",
											"bg-red-500 text-white",
											"px-4 py-2",
										)}
									>
										Wrong network
									</button>
								);
							}
							return (
								<Button
									className={cn(
										"group relative",
										"bg-primary text-primary-foreground",
										"rounded-md",
										"flex items-center gap-2",
										className,
									)}
									onClick={openAccountModal}
									{...props}
								>
									{account.displayName}
									{chain.hasIcon && (
										<>
											<span className="font-semibold">|</span>
											<img
												src={chain.iconUrl}
												className={cn("w-5 h-5")}
												alt="chain"
											/>
										</>
									)}
									<div
										className={cn(
											"before:absolute before:inset-0",
											"before:rounded-[inherit]",
											"before:bg-[linear-gradient(45deg,transparent_5%,theme(colors.white/.3)_50%,transparent_50%,transparent_100%)]",
											"before:bg-[length:250%_250%,100%_100%]",
											"before:bg-[position:200%_0,0_0]",
											"before:bg-no-repeat",
											"before:[transition:background-position_0s_ease]",
											"group-hover:before:bg-[position:-100%_0,0_0]",
											"group-hover:before:duration-[2500ms]",
										)}
									/>
								</Button>
							);
						})()}
					</div>
				);
			}}
		</ConnectButton.Custom>
	);
};

export default ConnectWallet;
