import { ApiClient } from "~/lib/api-client";
import type { AvailableTokens, TokenizedBonds } from "~/types";

const api = new ApiClient(
	"https://dazzling-enjoyment-production.up.railway.app/api/v1",
);

// CLOB ORDERBOOK
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
};

// TOKENIZED BOND
export const getTokeninedBonds = async () => {
	return api.get<TokenizedBonds[]>("/token/available-token");
};

export const getTokenizedBondToken = async (params: any) => {
	const payload = {
		qoute_token: params.quote_token,
		base_token: params.base_token,
		year: Number(params.year),
		month: params.month,
		rate: Number(params.rate),
	};
	return api.post<any>("/token/token", payload);
};

export const getTokenizedBondBestPrice = async (params: any) => {
	const payload = {
		qoute_token: params.quote_token,
		base_token: params.base_token,
		year: Number(params.year),
		month: params.month,
		rate: Number(params.rate),
	};
	return api.post<any>("/token/best-price", payload);
};
