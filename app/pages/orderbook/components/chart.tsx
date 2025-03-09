import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import useMaturityStore from "../states/maturity-state";

export default function ClobChart() {
	const { maturities, setMaturity } = useMaturityStore();
	return (
		<div className="h-full w-full bg-black/10 rounded-md">
			<ResponsiveContainer width="100%" height="100%">
				<AreaChart
					onClick={(e) => setMaturity(e.activeLabel || "")}
					data={maturities}
					margin={{ top: 0, right: 0, left: -32, bottom: 0 }}
				>
					<defs>
						<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
							<stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
						</linearGradient>
					</defs>
					<XAxis dataKey="Maturity" />
					<YAxis />
					<CartesianGrid strokeDasharray="3 3" stroke="#8884d866" />
					<Tooltip />
					<Area
						type="monotone"
						dataKey="BestRate"
						stroke="#8884d8"
						fillOpacity={1}
						fill="url(#colorUv)"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
}
