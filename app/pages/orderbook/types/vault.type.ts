import { z } from "zod";

const TokenSchema = z.object({
	TokenName: z.string(),
	TokenSymbol: z.string(),
	TokenAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
	TokenIcon: z.string().url(),
});

const VaultSchema = z.object({
	LendingVault: z.number(),
	BorrowVault: z.number(),
});

const LoanDetailsSchema = z.object({
	MaturityRange: z.string(),
	RateRange: z.string(),
});

export const CryptoLoanSchema = z.object({
	DebtToken: TokenSchema,
	CollateralToken: TokenSchema,
	MaturityRange: LoanDetailsSchema.shape.MaturityRange,
	RateRange: LoanDetailsSchema.shape.RateRange,
	LendingVault: VaultSchema.shape.LendingVault,
	BorrowVault: VaultSchema.shape.BorrowVault,
});
