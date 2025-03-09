import { useParams } from "react-router";
import { useMemo } from "react";
import { CryptoLoanSchema, type CryptoLoanType } from "../types/vault.type";

export const useSummary = () => {
	const { id } = useParams();

	return useMemo(() => {
		let loan: CryptoLoanType = {
			DebtTokenName: "",
			DebtTokenSymbol: "",
			DebtTokenAddress: "0x0000000000000000000000000000000000000000",
			DebtTokenIcon: "",
			CollateralTokenName: "",
			CollateralTokenSymbol: "",
			CollateralAddress: "0x0000000000000000000000000000000000000000",
			CollateralTokenIcon: "",
			MaturityRange: "",
			RateRange: "",
			LendingVault: 0,
			BorrowVault: 0,
		};

		if (!id) return loan;

		try {
			const decodedString = atob(id);
			loan = CryptoLoanSchema.parse(JSON.parse(decodedString));

			return {
				DebtTokenName: loan.DebtTokenName,
				DebtTokenSymbol: loan.DebtTokenSymbol,
				DebtTokenAddress: loan.DebtTokenAddress,
				DebtTokenIcon: loan.DebtTokenIcon,
				CollateralTokenName: loan.CollateralTokenName,
				CollateralTokenSymbol: loan.CollateralTokenSymbol,
				CollateralAddress: loan.CollateralAddress,
				CollateralTokenIcon: loan.CollateralTokenIcon,
				MaturityRange: loan.MaturityRange,
				RateRange: loan.RateRange,
				LendingVault: loan.LendingVault,
				BorrowVault: loan.BorrowVault,
			};
		} catch (error) {
			console.error("Invalid loan data:", error);
			return {
				DebtTokenName: "",
				DebtTokenSymbol: "",
				DebtTokenAddress: "0x0000000000000000000000000000000000000000",
				DebtTokenIcon: "",
				CollateralTokenName: "",
				CollateralTokenSymbol: "",
				CollateralAddress: "0x0000000000000000000000000000000000000000",
				CollateralTokenIcon: "",
				MaturityRange: "",
				RateRange: "",
				LendingVault: 0,
				BorrowVault: 0,
			};
		}
	}, [id]);
};
