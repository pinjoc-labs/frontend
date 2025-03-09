import { type ColumnDef } from "@tanstack/react-table";
import { SortingIndicator } from "./data-table";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";
import type { TokenizedBonds } from "~/types";
import { AvatarCollapse } from "~/components/ui/avatar-collapse";

export const columns: ColumnDef<TokenizedBonds>[] = [
	{
		accessorKey: "Symbol",
		accessorFn: (row) => `${row.BaseTokenSymbol}/${row.QuoteTokenSymbol}`,
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				className="hover:bg-transparent hover:text-white font-extralight"
			>
				Symbol
				<SortingIndicator column={column} />
			</Button>
		),
		cell: ({ row }) => (
			<div className="flex w-36 items-center gap-2">
				<div className="text-white font-extralight flex items-center gap-8">
					<AvatarCollapse
						avatarUrls={[
							row.original.BaseTokenIcon,
							row.original.QuoteTokenIcon,
						]}
					/>
					{row.original.BaseTokenSymbol}/{row.original.QuoteTokenSymbol}
				</div>
			</div>
		),
	},
	{
		accessorKey: "Maturity",
		accessorFn: (row) => row.MaturityRange,
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				className="px-0 font-normal cursor-pointer hover:text-white hover:bg-transparent"
			>
				Maturity
				<SortingIndicator column={column} />
			</Button>
		),
		cell: ({ row }) => (
			<span className="font-medium">{row.getValue("Maturity")}</span>
		),
	},
	{
		accessorKey: "APY",
		accessorFn: (row) => row.RateRange,
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				className="px-0 font-normal cursor-pointer hover:text-white hover:bg-transparent"
			>
				APY
				<SortingIndicator column={column} />
			</Button>
		),
		cell: ({ row }) => (
			<span className="font-medium">{row.getValue("APY")}</span>
		),
	},
	{
		accessorKey: "PriceRange",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				className="px-0 font-normal cursor-pointer hover:text-white hover:bg-transparent"
			>
				Price
				<SortingIndicator column={column} />
			</Button>
		),
		cell: ({ row }) => {
			function formatRange(value: string) {
				const [start, end] = value
					.split("~")
					.map((value: string) => Number.parseFloat(value.trim()));
				const formatter = new Intl.NumberFormat("en-US", {
					currency: "USD",
					style: "currency",
					maximumFractionDigits: 2,
					minimumFractionDigits: 2,
				});
				return `${formatter.format(start)} ~ ${formatter.format(end)}`;
			}
			return (
				<div className="font-extralight">
					{formatRange(row.getValue("PriceRange"))}
				</div>
			);
		},
	},
	{
		accessorKey: "Volume24h",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				className="px-0 font-normal cursor-pointer hover:text-white hover:bg-transparent"
			>
				Volume
				<SortingIndicator column={column} />
			</Button>
		),
		cell: ({ row }) => {
			function formatVolume24h(value: number): string {
				let formattedValue: string;

				if (value >= 1_000_000_000) {
					formattedValue = (value / 1_000_000_000).toFixed(2) + "B";
				} else if (value >= 1_000_000) {
					formattedValue = (value / 1_000_000).toFixed(2) + "M";
				} else if (value >= 1_000) {
					formattedValue = (value / 1_000).toFixed(0) + "K";
				} else {
					formattedValue = value.toString();
				}

				return `${formattedValue} USDC`;
			}
			return (
				<div className="font-extralight">
					{formatVolume24h(row.getValue("Volume24h"))}
				</div>
			);
		},
	},
	{
		accessorKey: "action",
		header: () => <p className="text-start">Action</p>,
		cell: ({ row }) => (
			<Link to={`/tokenizedbond-market/${btoa(JSON.stringify(row.original))}`}>
				<Button variant="secondary" className="rounded-full cursor-pointer">
					View market
				</Button>
			</Link>
		),
	},
];
