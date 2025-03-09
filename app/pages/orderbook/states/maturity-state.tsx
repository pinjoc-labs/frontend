import { create } from "zustand";
import type { BestRateType } from "../types/best-rate.type";
import { getBestRates } from "~/utils/api";

interface MaturityState {
	maturities: BestRateType[];
	maturity: string | null;
	bestRate: number;
	error: string | null;
}

interface MaturityActions {
	setMaturity: (maturity: string) => void;
	fetchMaturities: (
		collateral_address: string,
		debt_token_address: string,
	) => Promise<void>;
}

const defaultMaturity = "MAY 2025";

const useMaturityStore = create<MaturityState & MaturityActions>((set) => ({
	// Initial state
	maturities: [],
	maturity: null,
	bestRate: 0,
	error: null,

	// Actions
	setMaturity: (maturity: string) => {
		set((state) => {
			const bestRates = state.maturities.filter(
				(item: BestRateType) => item.Maturity === maturity,
			);

			if (bestRates.length > 0) {
				return {
					...state,
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
