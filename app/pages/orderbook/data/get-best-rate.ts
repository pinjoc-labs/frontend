import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBestRates } from "~/utils/api";

export const useBestRates = (params: {
	collateral_address: string;
	debt_token_address: string;
}) => {
	return useQuery({
		queryKey: [
			"getBestRate",
			params.collateral_address,
			params.debt_token_address,
		],
		queryFn: async () => {
			const payload = {
				collateral_address: params.collateral_address,
				debt_token_address: params.debt_token_address,
			};
			return await getBestRates(payload);
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
