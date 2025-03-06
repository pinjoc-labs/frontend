import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "~/components/ui/button";
import { SortingIndicator } from "./data-table";
import type { ICollection, ISupply } from "./types";

// Columns definition
export const columnsBorrow: ColumnDef<ICollection>[] = [
	{
		accessorKey: "asset",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				className="px-0 font-normal cursor-pointer hover:text-white hover:bg-transparent"
			>
				Asset
				<SortingIndicator column={column} />
			</Button>
		),
		cell: ({ row }) => (
			<span className="font-medium">{row.getValue("asset")}</span>
		),
	},
	{
		accessorKey: "colleteral",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				className="px-0 font-normal cursor-pointer hover:text-white hover:bg-transparent"
			>
				Colleteral
				<SortingIndicator column={column} />
			</Button>
		),
		cell: ({ row }) => (
			<span className="font-medium">{row.getValue("colleteral")}</span>
		),
	},
	{
		accessorKey: "maturity",
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
			<span className="font-medium">{row.getValue("maturity")}</span>
		),
	},
	{
		accessorKey: "borrowed",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				className="px-0 font-normal cursor-pointer hover:text-white hover:bg-transparent"
			>
				Borrowed
				<SortingIndicator column={column} />
			</Button>
		),
		cell: ({ row }) => (
			<span className="font-medium">{row.getValue("borrowed")}</span>
		),
	},
	{
		accessorKey: "apy",
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
			<span className="font-medium">{row.getValue("apy")}</span>
		),
	},
	{
		accessorKey: "action",
		header: () => {
			return <p>Action</p>;
		},
		cell: () => {
			return (
				<div className="flex items-center space-x-2">
					<Button variant="secondary" className="rounded-full cursor-pointer">
						Repay
					</Button>
					<Button variant="secondary" className="rounded-full cursor-pointer">
						Add Collateral
					</Button>
				</div>
			);
		},
	},
];

export const columnsSupply: ColumnDef<ISupply>[] = [
	{
		accessorKey: "asset",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				className="px-0 font-normal cursor-pointer hover:text-white hover:bg-transparent"
			>
				Asset
				<SortingIndicator column={column} />
			</Button>
		),
		cell: ({ row }) => (
			<span className="font-medium">{row.getValue("asset")}</span>
		),
	},
	{
		accessorKey: "supplied",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				className="px-0 font-normal cursor-pointer hover:text-white hover:bg-transparent"
			>
				Supplied
				<SortingIndicator column={column} />
			</Button>
		),
		cell: ({ row }) => (
			<span className="font-medium">{row.getValue("supplied")}</span>
		),
	},
	{
		accessorKey: "maturity",
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
			<span className="font-medium">{row.getValue("maturity")}</span>
		),
	},
	{
		accessorKey: "earned",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				className="px-0 font-normal cursor-pointer hover:text-white hover:bg-transparent"
			>
				Earned
				<SortingIndicator column={column} />
			</Button>
		),
		cell: ({ row }) => (
			<span className="font-medium">{row.getValue("earned")}</span>
		),
	},
	{
		accessorKey: "apy",
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
			<span className="font-medium">{row.getValue("apy")}</span>
		),
	},
	{
		accessorKey: "action",
		header: () => {
			return <p>Action</p>;
		},
		cell: () => {
			return (
				<div className="flex items-center space-x-2">
					<Button variant="secondary" className="rounded-full cursor-pointer">
						Withdraw
					</Button>
					<Button variant="secondary" className="rounded-full cursor-pointer">
						View Token Market
					</Button>
				</div>
			);
		},
	},
];
