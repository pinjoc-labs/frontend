import { ApiClient } from "~/lib/api-client";
import type { AvailableTokens, TokenizedBonds } from "~/types";

const api = new ApiClient(
	"https://dazzling-enjoyment-production.up.railway.app/api/v1",
);

export const getAvailableTokens = async () => {
	return api.get<AvailableTokens[]>("/clob/available-token");
};

export const getClob = async (params: any) => {
	const payload = {
		collateral_address: params.collateral_address,
		debt_token_address: params.debt_token_address,
		year: Number(params.year),
		month: params.month,
	};
	return api.post<any>("/clob/clob", payload);
};

export const getBestRates = async (payload: any) => {
	return api.post<any>("/clob/maturity-best-rate", payload);

export const getTokeninedBonds = async () => {
	return api.get<TokenizedBonds[]>("/token/available-token");
};
