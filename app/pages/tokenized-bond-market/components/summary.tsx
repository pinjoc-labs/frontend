import { TokenIcon } from '~/components/derived/wagmi/token-icon';
import { useSummary } from '../data/get-summary';
import {
  useTokenizedBondBestPrice,
  useTokenizedBondToken,
} from '../data/get-best-rate';
import useMaturityStore from '../states/maturity-state';
import { useEffect } from 'react';

export default function Summary() {
  const {
    MaturityRange,
    RateRange,
    QuoteTokenName,
    QuoteTokenAddress,
    QuoteTokenSymbol,
    QuoteTokenIcon,
    BaseTokenName,
    BaseTokenSymbol,
    BaseTokenAddress,
    BaseTokenIcon,
    PriceRange,
    Volume24h,
  } = useSummary();

  const { data } = useTokenizedBondToken({
    quote_token: QuoteTokenAddress,
    base_token: BaseTokenAddress,
    year: 2025,
    month: 'NOV',
    rate: 7.5,
  });

  useTokenizedBondBestPrice({
    quote_token: QuoteTokenAddress,
    base_token: BaseTokenAddress,
    year: 2025,
    month: 'NOV',
    rate: 7.5,
  });

  const { setMaturities } = useMaturityStore();

  useEffect(() => {
    setMaturities(data);
  }, [data]);

  return (
    <div className="block">
      <div className="flex gap-x-6 items-center">
        <TokenIcon
          from={{
            token: QuoteTokenName,
            imageUrl: QuoteTokenIcon,
          }}
          to={{
            token: BaseTokenName,
            imageUrl: BaseTokenIcon,
          }}
        />
        <h2 className="font-semibold text-xl">{`${QuoteTokenSymbol}/${BaseTokenSymbol}`}</h2>
      </div>
      <br />
      <div className="flex gap-x-12">
        <SummaryItem label="Price Range" value={PriceRange} />
        <SummaryItem label="Maturity" value={MaturityRange} />
      </div>
      <br />
      <div className="flex gap-x-12">
        <SummaryItem label="Rate Range" value={RateRange} />
        <SummaryItem label="Volume24H" value={String(Volume24h)} />
      </div>
    </div>
  );
}

const SummaryItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-base text-white font-semibold">{value}</p>
    </div>
  );
};
