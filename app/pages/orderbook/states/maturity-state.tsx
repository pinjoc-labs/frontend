import { create } from 'zustand';
import type { BestRatesArrayType, BestRateType } from '../types/best-rate.type';
import { getBestRates } from '~/utils/api';

interface MaturityState {
  maturities: BestRatesArrayType;
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
  setMaturities: (maturities: BestRatesArrayType) => void;
  setStatusMarket: (status: boolean) => void;
  setRate: (rate: number) => void;
  setAmount: (rate: number) => void;
  setBestAmount: (rate: number) => void;
}

export const defaultMaturity = 'MAY 2025';

const useMaturityStore = create<MaturityState & MaturityActions>(set => ({
  maturities: [],
  maturity: defaultMaturity,
  bestRate: 0,
  rate: 0,
  bestAmount: 0,
  error: null,
  isMarket: false,
  amount: 0,

  setBestAmount: (amount: number) => {
    set(state => ({ ...state, bestAmount: amount }));
  },

  setMaturities: maturities => {
    set(state => ({ ...state, maturities: maturities }));
  },

  setMaturity: (maturity: string) => {
    set(state => {
      const bestRates = state.maturities.filter(
        (item: BestRateType) => item.Maturity === maturity
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
        error: 'No matching maturities found',
      };
    });
  },

  setAmount: (amount: number) => {
    set(state => ({ ...state, amount }));
  },

  setRate: (rate: number) => {
    set(state => ({ ...state, isMarket: false, rate }));
  },

  setStatusMarket: (status: boolean) => {
    set(state => {
      return {
        ...state,
        rate: status ? state.bestRate : state.rate,
        amount: status ? state.bestAmount : state.amount,
        isMarket: status,
      };
    });
  },
}));

export default useMaturityStore;
