"use client";

import * as React from "react";
import {
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
import { ChevronLeft, ChevronRight } from "lucide-react";
import { columns } from "./column";
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
import { data } from "./dummy";

// Constants
const TABLE_HEIGHT = 500; // Fixed table height

// Sorting indicator component
export function SortingIndicator({ column }: { column: any }) {
	return column.getIsSorted() ? (
		<span className="ml-2">{column.getIsSorted() === "asc" ? "↑" : "↓"}</span>
	) : null;
}

// Skeleton Table for loading state
function TableSkeleton() {
	return (
		<>
			<TableHeader className="sticky top-0 bg-purple-400/10 z-10">
				<TableRow className="border-b border-neutral-800">
					{columns.map((column, index) => (
						<TableHead key={index} className="text-neutral-400 font-normal">
							<div className="h-6 bg-purple-400/10 rounded animate-pulse w-20 mx-auto" />
						</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{Array.from({ length: 10 }).map((_, rowIndex) => (
					<TableRow key={rowIndex} className="border-b border-neutral-800">
						{columns.map((_, cellIndex) => (
							<TableCell key={cellIndex} className="px-4 py-3">
								<div className="h-4 bg-purple-400/10 rounded animate-pulse w-24 mx-auto" />
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
		{ id: "timestamp", desc: true },
	]);

	React.useEffect(() => {
		// Simulate loading data
		const timer = setTimeout(() => setLoading(false), 2000);
		return () => clearTimeout(timer);
	}, []);

	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
	React.useEffect(() => {
		setColumnFilters(searchQuery ? [{ id: "token", value: searchQuery }] : []);
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
		state: { sorting, columnFilters, columnVisibility, pagination },
	});

	return (
		<div>
			{/* Header */}
			<div className="p-6 pb-2">
				<h1 className="text-2xl font-semibold">Transaction History</h1>
			</div>

			{/* Search Input */}
			<div className="px-4 pb-2">
				<Input
					placeholder="Search by token name..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="max-w-sm bg-purple-400/10 border-neutral-700 text-white placeholder:text-neutral-400"
				/>
			</div>

			{/* Sorting & Controls */}
			<div className="flex items-center justify-between p-4">
				<div className="text-sm text-muted-foreground">
					{loading ? (
						<div className="h-4 bg-purple-400/10 rounded animate-pulse w-32" />
					) : sorting.length > 0 ? (
						<span>
							Sorted by: <strong>{sorting[0].id}</strong>{" "}
							{sorting[0].desc ? "↓" : "↑"}
						</span>
					) : (
						"Not sorted"
					)}
				</div>
				<div className="flex space-x-2">
					{searchQuery && (
						<Button
							variant="secondary"
							size="sm"
							onClick={() => setSearchQuery("")}
						>
							Clear search
						</Button>
					)}
					<Button
						variant="secondary"
						size="sm"
						onClick={() => setSorting([])}
						disabled={loading || sorting.length === 0}
					>
						Reset
					</Button>
				</div>
			</div>

			{/* Table */}
			<div
				className="overflow-hidden bg-purple-400/10 rounded"
				style={{ height: `${TABLE_HEIGHT}px` }}
			>
				<Table className="border-collapse ">
					{loading ? (
						<TableSkeleton />
					) : (
						<>
							<TableHeader className="sticky top-0 bg-purple-400/10 z-10">
								{table.getHeaderGroups().map((headerGroup) => (
									<TableRow
										key={headerGroup.id}
										className="border-b border-neutral-800 hover:bg-transparent"
									>
										{headerGroup.headers.map((header) => (
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
										))}
									</TableRow>
								))}
							</TableHeader>
							<TableBody>
								{table.getRowModel().rows.length ? (
									table.getRowModel().rows.map((row) => (
										<TableRow
											key={row.id}
											data-state={row.getIsSelected() && "selected"}
											className="border-b border-neutral-800 hover:bg-purple-400/10"
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

			{/* Pagination */}
			<div className="flex items-center justify-end space-x-2 p-4 bg-purple-400/10">
				<div className="flex-1 text-sm text-muted-foreground">
					{loading ? (
						<div className="h-4 bg-purple-400/10 rounded animate-pulse w-20" />
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
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>
					<Button
						variant="secondary"
						size="icon"
						onClick={() => table.nextPage()}
						disabled={loading || !table.getCanNextPage()}
					>
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}
