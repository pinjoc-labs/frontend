import { z } from "zod";

export const LoanPayloadSchema = z.object({
	collateral_address: z
		.string()
		.regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
	debt_token_address: z
		.string()
		.regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
	month: z.string(),
	year: z.number().int().min(2000).max(2100),
});

export type LoanPayloadType = z.infer<typeof LoanPayloadSchema>;

export const OrderSchema = z.object({
	Rate: z.number(),
	AvailableToken: z.number(),
	OrderType: z.enum(["LEND", "BORROW"]),
});

export const OrdersSchema = z.array(OrderSchema);

export type OrderType = z.infer<typeof OrderSchema>;
export type OrdersType = z.infer<typeof OrdersSchema>;
