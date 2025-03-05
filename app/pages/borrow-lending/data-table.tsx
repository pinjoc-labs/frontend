"use client";

import * as React from "react";
import {
	type ColumnDef,
	type ColumnFiltersState,
	type SortingState,
	type VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { ArrowDown, ChevronLeft, ChevronRight, Star } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";

// Constants
const TABLE_HEIGHT = 500; // Fixed height for the table in pixels

// Sorting indicator component
function SortingIndicator({ column }: { column: any }) {
	return (
		<>
			{column.getIsSorted() && (
				<span className="ml-2">
					{column.getIsSorted() === "asc" ? "↑" : "↓"}
				</span>
			)}
		</>
	);
}

// Define the data type for our cryptocurrency market data
type CryptoMarket = {
	id: string;
	token: string;
	icon: string;
	lendApy: number;
	isPopular: boolean;
	supplied: {
		value: number;
		formatted: string;
		usdValue: string;
	};
	borrowed: {
		value: number;
		formatted: string;
		usdValue: string;
	};
};

// Sample data based on the screenshot
const data: CryptoMarket[] = [
	{
		id: "usdc",
		token: "USDC",
		icon: "🔵",
		lendApy: 5.0,
		isPopular: true,
		supplied: {
			value: 5551000000,
			formatted: "5.551M",
			usdValue: "$5.551M",
		},
		borrowed: {
			value: 2459000000,
			formatted: "2.459M",
			usdValue: "$2.459M",
		},
	},
	{
		id: "sol",
		token: "SOL",
		icon: "◼️",
		lendApy: 7.25,
		isPopular: true,
		supplied: {
			value: 19420,
			formatted: "19.42K",
			usdValue: "$2.637M",
		},
		borrowed: {
			value: 16590,
			formatted: "16.59K",
			usdValue: "$2.252M",
		},
	},
	{
		id: "wbtc",
		token: "WBTC",
		icon: "🟠",
		lendApy: 2.5,
		isPopular: false,
		supplied: {
			value: 4.18,
			formatted: "4.18",
			usdValue: "$348.6K",
		},
		borrowed: {
			value: 0.29,
			formatted: "0.29",
			usdValue: "$24.08K",
		},
	},
	{
		id: "usdt",
		token: "USDT",
		icon: "💎",
		lendApy: 12.3,
		isPopular: false,
		supplied: {
			value: 187800,
			formatted: "187.8K",
			usdValue: "$187.7K",
		},
		borrowed: {
			value: 83660,
			formatted: "83.66K",
			usdValue: "$83.62K",
		},
	},
	{
		id: "wen",
		token: "WEN",
		icon: "⚪",
		lendApy: 0.2,
		isPopular: false,
		supplied: {
			value: 3436000000,
			formatted: "3.436B",
			usdValue: "$99.38K",
		},
		borrowed: {
			value: 5129,
			formatted: "5.129K",
			usdValue: "$0.15",
		},
	},
	{
		id: "usds",
		token: "USDS",
		icon: "🟡",
		lendApy: 10.0,
		isPopular: false,
		supplied: {
			value: 95890,
			formatted: "95.89K",
			usdValue: "$95.89K",
		},
		borrowed: {
			value: 36120,
			formatted: "36.12K",
			usdValue: "$36.11K",
		},
	},
	{
		id: "bonk",
		token: "Bonk",
		icon: "🟠",
		lendApy: 0.01,
		isPopular: false,
		supplied: {
			value: 4881000000,
			formatted: "4.881B",
			usdValue: "$56.87K",
		},
		borrowed: {
			value: 15300,
			formatted: "15.3K",
			usdValue: "$0.18",
		},
	},
	{
		id: "weth",
		token: "WETH",
		icon: "🟣",
		lendApy: 0.5,
		isPopular: false,
		supplied: {
			value: 16.19,
			formatted: "16.19",
			usdValue: "$33.87K",
		},
		borrowed: {
			value: 12.4,
			formatted: "12.4",
			usdValue: "$25.94K",
		},
	},
	{
		id: "jup",
		token: "JUP",
		icon: "🔵",
		lendApy: 0.01,
		isPopular: false,
		supplied: {
			value: 30570,
			formatted: "30.57K",
			usdValue: "$19.33K",
		},
		borrowed: {
			value: 13440,
			formatted: "13.44K",
			usdValue: "$8,498.19",
		},
	},
	{
		id: "pyusd",
		token: "PYUSD",
		icon: "🔵",
		lendApy: 9.2,
		isPopular: false,
		supplied: {
			value: 14980,
			formatted: "14.98K",
			usdValue: "$14.97K",
		},
		borrowed: {
			value: 1481,
			formatted: "1.481K",
			usdValue: "$1,480.01",
		},
	},
	{
		id: "wen",
		token: "WEN",
		icon: "⚪",
		lendApy: 0.2,
		isPopular: false,
		supplied: {
			value: 3436000000,
			formatted: "3.436B",
			usdValue: "$99.38K",
		},
		borrowed: {
			value: 5129,
			formatted: "5.129K",
			usdValue: "$0.15",
		},
	},
	{
		id: "usds",
		token: "USDS",
		icon: "🟡",
		lendApy: 10.0,
		isPopular: false,
		supplied: {
			value: 95890,
			formatted: "95.89K",
			usdValue: "$95.89K",
		},
		borrowed: {
			value: 36120,
			formatted: "36.12K",
			usdValue: "$36.11K",
		},
	},
	{
		id: "bonk",
		token: "Bonk",
		icon: "🟠",
		lendApy: 0.01,
		isPopular: false,
		supplied: {
			value: 4881000000,
			formatted: "4.881B",
			usdValue: "$56.87K",
		},
		borrowed: {
			value: 15300,
			formatted: "15.3K",
			usdValue: "$0.18",
		},
	},
	{
		id: "weth",
		token: "WETH",
		icon: "🟣",
		lendApy: 0.5,
		isPopular: false,
		supplied: {
			value: 16.19,
			formatted: "16.19",
			usdValue: "$33.87K",
		},
		borrowed: {
			value: 12.4,
			formatted: "12.4",
			usdValue: "$25.94K",
		},
	},
	{
		id: "jup",
		token: "JUP",
		icon: "🔵",
		lendApy: 0.01,
		isPopular: false,
		supplied: {
			value: 30570,
			formatted: "30.57K",
			usdValue: "$19.33K",
		},
		borrowed: {
			value: 13440,
			formatted: "13.44K",
			usdValue: "$8,498.19",
		},
	},
	{
		id: "pyusd",
		token: "PYUSD",
		icon: "🔵",
		lendApy: 9.2,
		isPopular: false,
		supplied: {
			value: 14980,
			formatted: "14.98K",
			usdValue: "$14.97K",
		},
		borrowed: {
			value: 1481,
			formatted: "1.481K",
			usdValue: "$1,480.01",
		},
	},
];

// Define the columns for our table
export const columns: ColumnDef<CryptoMarket>[] = [
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

function TableSkeleton() {
	return (
		<>
			<TableHeader className="sticky top-0 bg-neutral-900 z-10">
				<TableRow className="border-b border-neutral-800 hover:bg-transparent">
					{columns.map((column, index) => (
						<TableHead key={index} className="text-neutral-400 font-normal">
							<div className="h-6 bg-neutral-800/50 rounded animate-pulse w-16" />
						</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{Array(8)
					.fill(0)
					.map((_, rowIndex) => (
						<TableRow key={rowIndex} className="border-b border-neutral-800">
							{Array(columns.length)
								.fill(0)
								.map((_, cellIndex) => (
									<TableCell key={cellIndex}>
										{cellIndex === 0 ? (
											<div className="flex items-center gap-2">
												<div className="w-6 h-6 rounded-full bg-neutral-800 animate-pulse" />
												<div className="h-4 bg-neutral-800/50 rounded animate-pulse w-16" />
											</div>
										) : cellIndex === 1 ? (
											<div className="flex items-center gap-2">
												<div className="w-6 h-6 rounded-full bg-neutral-800 animate-pulse" />
												<div className="h-4 bg-neutral-800/50 rounded animate-pulse w-12" />
											</div>
										) : cellIndex === columns.length - 1 ? (
											<div className="h-8 bg-neutral-800/50 rounded-full animate-pulse w-24" />
										) : (
											<div className="space-y-2">
												<div className="h-4 bg-neutral-800/50 rounded animate-pulse w-16" />
												<div className="h-3 bg-neutral-800/30 rounded animate-pulse w-20" />
											</div>
										)}
									</TableCell>
								))}
						</TableRow>
					))}
			</TableBody>
		</>
	);
}

export function DataTable() {
	const [loading, setLoading] = React.useState(true);
	const [searchQuery, setSearchQuery] = React.useState("");
	const [sorting, setSorting] = React.useState<SortingState>([
		{
			id: "lendApy",
			desc: true,
		},
	]);

	React.useEffect(() => {
		// Simulate loading data
		const timer = setTimeout(() => {
			setLoading(false);
		}, 2000);

		return () => clearTimeout(timer);
	}, []);

	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);

	React.useEffect(() => {
		if (searchQuery) {
			setColumnFilters([{ id: "token", value: searchQuery }]);
		} else {
			setColumnFilters([]);
		}
	}, [searchQuery]);

	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [pagination, setPagination] = React.useState({
		pageIndex: 0,
		pageSize: 10,
	});

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onPaginationChange: setPagination,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			pagination,
		},
	});

	return (
		<div>
			<div className="p-6 pb-2">
				<h1 className="text-2xl font-semibold">Markets</h1>
			</div>
			<div className="px-4 pb-2">
				<Input
					placeholder="Search by token name..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="max-w-sm bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400"
				/>
			</div>
			<div className="flex items-center justify-between p-4">
				<div className="flex flex-1 items-center space-x-2">
					<div className="text-sm text-muted-foreground">
						{loading ? (
							<div className="h-4 bg-neutral-800/50 rounded animate-pulse w-32" />
						) : sorting.length > 0 ? (
							<div className="flex items-center gap-1">
								<span>Sorted by:</span>
								<span className="font-medium">
									{sorting[0].id.charAt(0).toUpperCase() +
										sorting[0].id.slice(1)}
								</span>
								<span>{sorting[0].desc ? "↓" : "↑"}</span>
							</div>
						) : (
							"Not sorted"
						)}
					</div>
				</div>
				<div className="flex items-center space-x-2">
					{searchQuery && (
						<Button
							variant="secondary"
							size="sm"
							onClick={() => setSearchQuery("")}
							className="h-8 px-2 lg:px-3"
						>
							Clear search
						</Button>
					)}
					<Button
						variant="secondary"
						size="sm"
						onClick={() => setSorting([])}
						className="h-8 px-2 lg:px-3"
						disabled={loading || sorting.length === 0}
					>
						Reset
					</Button>
				</div>
			</div>
			<div
				className="overflow-hidden bg-neutral-800/50 rounded"
				style={{ height: `${TABLE_HEIGHT}px` }}
			>
				<Table className="border-collapse ">
					{loading ? (
						<TableSkeleton />
					) : (
						<>
							<TableHeader className="sticky top-0 bg-neutral-800/50 z-10">
								{table.getHeaderGroups().map((headerGroup) => (
									<TableRow
										key={headerGroup.id}
										className="border-b border-neutral-800 hover:bg-transparent"
									>
										{headerGroup.headers.map((header) => {
											return (
												<TableHead
													key={header.id}
													className="text-neutral-400 font-normal"
												>
													{header.isPlaceholder
														? null
														: flexRender(
																header.column.columnDef.header,
																header.getContext(),
															)}
												</TableHead>
											);
										})}
									</TableRow>
								))}
							</TableHeader>
							<TableBody className="overflow-auto">
								{table.getRowModel().rows?.length ? (
									table.getRowModel().rows.map((row) => (
										<TableRow
											key={row.id}
											data-state={row.getIsSelected() && "selected"}
											className="border-b border-neutral-800 hover:bg-neutral-800/50"
										>
											{row.getVisibleCells().map((cell) => (
												<TableCell key={cell.id}>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext(),
													)}
												</TableCell>
											))}
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell
											colSpan={columns.length}
											className="h-24 text-center"
										>
											{searchQuery
												? `No results found for "${searchQuery}".`
												: "No results."}
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</>
					)}
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 p-4 bg-neutral-800/50">
				<div className="flex-1 text-sm text-muted-foreground">
					{loading ? (
						<div className="h-4 bg-neutral-800/50 rounded animate-pulse w-20" />
					) : (
						`${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()}`
					)}
				</div>
				<div className="space-x-2">
					<Button
						variant="secondary"
						size="icon"
						onClick={() => table.previousPage()}
						disabled={loading || !table.getCanPreviousPage()}
						className="h-8 w-8 rounded-full p-0"
					>
						<ChevronLeft className="h-4 w-4" />
						<span className="sr-only">Previous page</span>
					</Button>
					<Button
						variant="secondary"
						size="icon"
						onClick={() => table.nextPage()}
						disabled={loading || !table.getCanNextPage()}
						className="h-8 w-8 rounded-full p-0"
					>
						<ChevronRight className="h-4 w-4" />
						<span className="sr-only">Next page</span>
					</Button>
				</div>
			</div>
		</div>
	);
}
