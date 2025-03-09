import { z } from "zod";

export const BestRateSchema = z.object({
	Maturity: z.string(),
	BestRate: z.number(),
});

export const BestRatesArraySchema = z.array(BestRateSchema);

export type BestRateType = z.infer<typeof BestRateSchema>;
export type BestRatesArrayType = z.infer<typeof BestRatesArraySchema>;
