import { type ColumnDef } from "@tanstack/react-table";
import { SortingIndicator } from "./data-table";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";
import type { AvailableTokens } from "~/types";
import { AvatarCollapse } from "~/components/ui/avatar-collapse";

export const columns: ColumnDef<AvailableTokens>[] = [
	{
		accessorKey: "Asset",
		accessorFn: (row) => row.CollateralTokenName, // Digunakan untuk sorting
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				className="hover:bg-transparent hover:text-white font-extralight"
			>
				Assets
				<SortingIndicator column={column} />
			</Button>
		),
		cell: ({ row }) => (
			<div className="flex w-36 items-center gap-2">
				<div className="text-white font-extralight flex items-center gap-8">
					<AvatarCollapse
						avatarUrls={[
							row.original.CollateralTokenIcon,
							row.original.DebtTokenIcon,
						]}
					/>
					{row.original.CollateralTokenSymbol}/{row.original.DebtTokenSymbol}
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
		accessorKey: "LendingVault",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				className="px-0 font-normal cursor-pointer hover:text-white hover:bg-transparent"
			>
				Lender Vault
				<SortingIndicator column={column} />
			</Button>
		),
		cell: ({ row }) => {
			const formatLenderVault = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD",
				minimumFractionDigits: 0,
				maximumFractionDigits: 0,
			}).format(row.getValue("LendingVault"));

			return <div className="font-extralight">{formatLenderVault}</div>;
		},
	},
	{
		accessorKey: "BorrowVault",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				className="px-0 font-normal cursor-pointer hover:text-white hover:bg-transparent"
			>
				Borrow Vault
				<SortingIndicator column={column} />
			</Button>
		),
		cell: ({ row }) => {
			const borrowFormat = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD",
				minimumFractionDigits: 0,
				maximumFractionDigits: 0,
			}).format(row.getValue("BorrowVault"));

			return <div className="font-extralight">{borrowFormat}</div>;
		},
	},
	{
		accessorKey: "action",
		header: () => <p className="text-start">Action</p>,
		cell: ({ row }) => (
			<Link to={`/orderbook/${btoa(JSON.stringify(row.original))}`}>
				<Button variant="secondary" className="rounded-full cursor-pointer">
					View market
				</Button>
			</Link>
		),
	},
];
