import { create } from "zustand";
import type { BestRateType } from "../types/best-rate.type";
import { getBestRates } from "~/utils/api";

interface MaturityState {
	maturities: BestRateType[];
	maturity: string | null;
	bestRate: number;
	rate: number;
	bestAmount: number;
	amount: number;
	error: string | null;
	isMarket: boolean;
}

interface MaturityActions {
	setMaturity: (maturity: string) => void;
	fetchMaturities: (
		collateral_address: string,
		debt_token_address: string,
	) => Promise<void>;
	setStatusMarket: (status: boolean) => void;
	setRate: (rate: number) => void;
	setAmount: (rate: number) => void;
	setBestAmount: (rate: number) => void;
}

const defaultMaturity = "MAY 2025";

const useMaturityStore = create<MaturityState & MaturityActions>((set) => ({
	maturities: [],
	maturity: null,
	bestRate: 0,
	rate: 0,
	bestAmount: 0,
	error: null,
	isMarket: false,
	amount: 0,

	setBestAmount: (amount: number) => {
		set((state) => ({ ...state, bestAmount: amount }));
	},

	setMaturity: (maturity: string) => {
		set((state) => {
			const bestRates = state.maturities.filter(
				(item: BestRateType) => item.Maturity === maturity,
			);

			if (bestRates.length > 0) {
				return {
					...state,
					isMarket: true,
					rate: bestRates[0].BestRate,
					bestRate: bestRates[0].BestRate,
					maturity: bestRates[0].Maturity,
				};
			}

			return {
				...state,
				error: "No matching maturities found",
			};
		});
	},

	setAmount: (amount: number) => {
		set((state) => ({ ...state, amount }));
	},

	setRate: (rate: number) => {
		set((state) => ({ ...state, isMarket: false, rate }));
	},

	setStatusMarket: (status: boolean) => {
		set((state) => {
			return {
				...state,
				rate: status ? state.bestRate : state.rate,
				amount: status ? state.bestAmount : state.amount,
				isMarket: status,
			};
		});
	},

	fetchMaturities: async (
		collateral_address: string,
		debt_token_address: string,
	) => {
		try {
			const payload = {
				collateral_address,
				debt_token_address,
			};
			const data = await getBestRates(payload);
			const bestRates = data.filter(
				(item: BestRateType) => item.Maturity === defaultMaturity,
			);

			if (bestRates.length > 0) {
				set({
					maturities: data,
					bestRate: bestRates[0].BestRate,
					maturity: bestRates[0].Maturity,
				});
			} else {
				set({ error: "No matching maturities found" });
			}
		} catch (error) {
			console.error("Failed to fetch maturities:", error);
			set({ error: "Failed to fetch maturities" });
		}
	},
}));

export default useMaturityStore;
