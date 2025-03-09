import { z } from "zod";

export const CryptoLoanSchema = z.object({
	DebtTokenName: z.string(),
	DebtTokenSymbol: z.string(),
	DebtTokenAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
	DebtTokenIcon: z.string().url(),
	CollateralTokenName: z.string(),
	CollateralTokenSymbol: z.string(),
	CollateralAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
	CollateralTokenIcon: z.string().url(),
	MaturityRange: z.string(),
	RateRange: z.string(),
	LendingVault: z.number(),
	BorrowVault: z.number(),
});

export type CryptoLoanType = z.infer<typeof CryptoLoanSchema>;
