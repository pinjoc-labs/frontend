import { z } from "zod";

export const TokenizedBondSchema = z.object({
	QuoteTokenName: z.string(),
	QuoteTokenSymbol: z.string(),
	QuoteTokenAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
	QuoteTokenIcon: z.string().url(),
	BaseTokenName: z.string(),
	BaseTokenSymbol: z.string(),
	BaseTokenAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
	BaseTokenIcon: z.string().url(),
	MaturityRange: z.string(),
	RateRange: z.string(),
	PriceRange: z.string(),
	Volume24h: z.number(),
});

export type TokenizedBondType = z.infer<typeof TokenizedBondSchema>;
