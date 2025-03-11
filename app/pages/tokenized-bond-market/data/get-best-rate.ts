import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	getBestRates,
	getTokenizedBondBestPrice,
	getTokenizedBondToken,
} from "~/utils/api";

export const useTokenizedBondToken = (params: {
	quote_token: string;
	base_token: string;
	year: number;
	month: string;
	rate: number;
}) => {
	return useQuery({
		queryKey: [
			"getTokenTokenizedBond",
			params.quote_token,
			params.base_token,
			params.year,
			params.month,
			params.rate,
		],
		queryFn: async () => {
			const payload = {
				quote_token: params.quote_token,
				base_token: params.base_token,
				year: params.year,
				month: params.month,
				rate: params.rate,
			};
			return await getTokenizedBondToken(payload);
		},
		staleTime: 1000 * 60 * 5,
	});
};

export const useTokenizedBondBestPrice = (params: {
	quote_token: string;
	base_token: string;
	year: number;
	month: string;
	rate: number;
}) => {
	return useQuery({
		queryKey: [
			"getBestRateTokenizedBond",
			params.quote_token,
			params.base_token,
			params.year,
			params.month,
			params.rate,
		],
		queryFn: async () => {
			const payload = {
				quote_token: params.quote_token,
				base_token: params.base_token,
				year: params.year,
				month: params.month,
				rate: params.rate,
			};
			return await getTokenizedBondBestPrice(payload);
		},
		staleTime: 1000 * 60 * 5,
	});
};

export const useUpdateBestRates = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (params: {
			collateral_address: string;
			debt_token_address: string;
		}) => {
			const payload = {
				collateral_address: params.collateral_address,
				debt_token_address: params.debt_token_address,
			};
			return await getBestRates(payload);
		},
		onSuccess: (newMaturity) => {
			queryClient.setQueryData<string>(["getBestRate"], newMaturity);
		},
	});
};
