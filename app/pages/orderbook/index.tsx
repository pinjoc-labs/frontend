import ClobChart from './components/chart';
import { ActionTab } from './components/form';
import Orderbook from './components/orderbook';
import Summary from './components/summary';

export default function OrderbookPage() {
  return (
    <div className="grid grid-flow-row-dense grid-cols-5 h-[calc(100vh-8rem)]">
      <div className="col-span-3 grid grid-rows-[93px_auto]">
        <div className="flex items-center border-b border-gray-600 p-4">
          <Summary />
        </div>
        <div className="grid grid-cols-1 grid-rows-5">
          <div className="row-span-3 p-4">
            <ClobChart />
          </div>
          <div className="p-4 row-span-2" />
        </div>
      </div>
      <div className="border-x border-x-gray-600">
        <Orderbook />
      </div>
      <div>
        <ActionTab />
      </div>
    </div>
  );
}
