import { useParams } from "react-router";
import { useMemo } from "react";
import {
	type TokenizedBondType,
	TokenizedBondSchema,
} from "../types/vault.type";

export const useSummary = () => {
	const { id } = useParams();
	return useMemo(() => {
		let loan: TokenizedBondType = {
			QuoteTokenName: "",
			QuoteTokenSymbol: "",
			QuoteTokenAddress: "0x0000000000000000000000000000000000000000",
			QuoteTokenIcon: "",
			BaseTokenName: "",
			BaseTokenSymbol: "",
			BaseTokenAddress: "0x0000000000000000000000000000000000000000",
			BaseTokenIcon: "",
			MaturityRange: "",
			RateRange: "",
			PriceRange: "",
			Volume24h: 0,
		};

		if (!id) return loan;

		try {
			const decodedString = atob(id);
			loan = TokenizedBondSchema.parse(JSON.parse(decodedString));

			return {
				QuoteTokenName: loan.QuoteTokenName,
				QuoteTokenSymbol: loan.QuoteTokenSymbol,
				QuoteTokenAddress: loan.QuoteTokenAddress,
				QuoteTokenIcon: loan.QuoteTokenIcon,
				BaseTokenName: loan.BaseTokenName,
				BaseTokenSymbol: loan.BaseTokenSymbol,
				BaseTokenAddress: loan.BaseTokenAddress,
				BaseTokenIcon: loan.BaseTokenIcon,
				MaturityRange: loan.MaturityRange,
				RateRange: loan.RateRange,
				PriceRange: loan.PriceRange,
				Volume24h: loan.Volume24h,
			};
		} catch (error) {
			console.error("Invalid loan data:", error);
			return {
				QuoteTokenName: "",
				QuoteTokenSymbol: "",
				QuoteTokenAddress: "0x0000000000000000000000000000000000000000",
				QuoteTokenIcon: "",
				BaseTokenName: "",
				BaseTokenSymbol: "",
				BaseTokenAddress: "0x0000000000000000000000000000000000000000",
				BaseTokenIcon: "",
				MaturityRange: "",
				RateRange: "",
				PriceRange: "",
				Volume24h: 0,
			};
		}
	}, [id]);
};
