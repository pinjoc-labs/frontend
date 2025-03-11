import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getClob } from "~/utils/api";
import { extractMonthAndYear } from "~/utils/helper";
import type { OrderType } from "../types/clob.type";

export const useClob = (params: {
	collateral_address: string;
	debt_token_address: string;
	maturity: string;
}) => {
	return useQuery({
		queryKey: [
			"getClob",
			params.collateral_address,
			params.debt_token_address,
			params.maturity,
		],
		queryFn: async () => {
			const { month, year } = extractMonthAndYear(params.maturity);
			const payload = {
				collateral_address: params.collateral_address,
				debt_token_address: params.debt_token_address,
				year: Number(year),
				month: month,
			};
			const data = await getClob(payload);
			data.sort((a: OrderType, b: OrderType) => b.Rate - a.Rate);
			return data;
		},
		staleTime: 1000 * 60 * 5,
	});
};

export const useUpdateClob = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (params: {
			collateral_address: string;
			debt_token_address: string;
			maturity: string;
		}) => {
			const { month, year } = extractMonthAndYear(params.maturity);
			const payload = {
				collateral_address: params.collateral_address,
				debt_token_address: params.debt_token_address,
				year: Number(year),
				month: month,
			};
			const data = await getClob(payload);
			data.sort((a: OrderType, b: OrderType) => b.Rate - a.Rate);
			return data;
		},
		onSuccess: (newMaturity) => {
			queryClient.setQueryData<string>(["getClob"], newMaturity);
		},
	});
};
