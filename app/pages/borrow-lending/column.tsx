import { type ColumnDef } from "@tanstack/react-table";
import { SortingIndicator } from "./data-table";
import { Button } from "~/components/ui/button";
import type { IBorrowLend } from "./types";
import { ArrowDown, Star } from "lucide-react";

export const columns: ColumnDef<IBorrowLend>[] = [
	{
		accessorKey: "token",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="px-0 font-normal cursor-pointer hover:text-white hover:bg-transparent"
				>
					Token
					<SortingIndicator column={column} />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<div className="flex items-center gap-2">
					<div className="w-6 h-6 flex items-center justify-center">
						{row.original.icon}
					</div>
					<span className="font-medium">{row.original.token}</span>
				</div>
			);
		},
	},
	{
		accessorKey: "lendApy",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="px-0 font-normal cursor-pointer hover:text-white hover:bg-transparent"
				>
					Lend APY
					<SortingIndicator column={column} />
				</Button>
			);
		},
		cell: ({ row }) => {
			const apy = row.original.lendApy;
			const isLessThanPointOne = apy < 0.1 && apy > 0;

			return (
				<div className="flex items-center gap-2">
					<div className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center">
						{row.original.isPopular ? (
							<Star className="w-3 h-3 text-yellow-400" />
						) : (
							<ArrowDown className="w-3 h-3 text-blue-400" />
						)}
					</div>
					<span className="font-medium">
						{isLessThanPointOne
							? "<0.01%"
							: `${apy.toFixed(apy % 1 === 0 ? 0 : 1)}%`}
					</span>
				</div>
			);
		},
		sortingFn: "basic",
	},
	{
		accessorKey: "supplied",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="px-0 font-normal cursor-pointer hover:text-white hover:bg-transparent"
				>
					Supplied
					<SortingIndicator column={column} />
				</Button>
			);
		},
		cell: ({ row }) => {
			const supplied = row.original.supplied;
			return (
				<div className="flex flex-col">
					<span className="font-medium">{supplied.formatted}</span>
					<span className="text-sm text-muted-foreground">
						{supplied.usdValue}
					</span>
				</div>
			);
		},
		sortingFn: (rowA, rowB, columnId) => {
			return rowA.original.supplied.value > rowB.original.supplied.value
				? 1
				: -1;
		},
	},
	{
		accessorKey: "borrowed",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="px-0 font-normal cursor-pointer hover:text-white hover:bg-transparent"
				>
					Borrowed
					<SortingIndicator column={column} />
				</Button>
			);
		},
		cell: ({ row }) => {
			const borrowed = row.original.borrowed;
			return (
				<div className="flex flex-col">
					<span className="font-medium">{borrowed.formatted}</span>
					<span className="text-sm text-muted-foreground">
						{borrowed.usdValue}
					</span>
				</div>
			);
		},
		sortingFn: (rowA, rowB, columnId) => {
			return rowA.original.borrowed.value > rowB.original.borrowed.value
				? 1
				: -1;
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			return (
				<Button variant="secondary" className="rounded-full cursor-pointer">
					View market
				</Button>
			);
		},
	},
];
