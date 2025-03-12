import { ActionTab } from './components/form';
import Summary from './components/summary';

export default function OrderbookPage() {
  return (
    <div className="block border border-gray-800 roudned-md my-12 shadow-md max-w-screen-sm mx-auto p-6">
      <Summary />
      <ActionTab />
    </div>
  );
}
