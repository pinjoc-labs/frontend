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
import { ChevronLeft, ChevronRight } from "lucide-react";
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
export function SortingIndicator({ column }: { column: any }) {
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

function TableSkeleton<TData, TValue>({
	columns,
}: {
	columns: ColumnDef<TData, TValue>[];
}) {
	return (
		<>
			<TableHeader className="sticky top-0 bg-purple-400/10 z-10">
				<TableRow className="border-b border-neutral-800 hover:bg-transparent">
					{columns.map((column, index) => (
						<TableHead key={index} className="text-neutral-400 font-normal">
							<div className="h-6 bg-purple-400/10 rounded animate-pulse w-16" />
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
												<div className="w-6 h-6 rounded-full bg-neutral-400/20 animate-pulse" />
												<div className="h-4 bg-purple-400/10 rounded animate-pulse w-16" />
											</div>
										) : cellIndex === 1 ? (
											<div className="flex items-center gap-2">
												<div className="w-6 h-6 rounded-full bg-neutral-400/20 animate-pulse" />
												<div className="h-4 bg-purple-400/10 rounded animate-pulse w-12" />
											</div>
										) : cellIndex === columns.length - 1 ? (
											<div className="h-8 bg-purple-400/10 rounded-full animate-pulse w-24" />
										) : (
											<div className="space-y-2">
												<div className="h-4 bg-purple-400/10 rounded animate-pulse w-16" />
												<div className="h-3 bg-neutral-400/20 rounded animate-pulse w-20" />
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

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	isLoading: boolean;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	isLoading,
}: DataTableProps<TData, TValue>) {
	const [searchQuery, setSearchQuery] = React.useState("");
	const [sorting, setSorting] = React.useState<SortingState>([
		{
			id: "Symbol",
			desc: true,
		},
	]);

	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);

	React.useEffect(() => {
		setColumnFilters((prev) =>
			searchQuery
				? [{ id: "Symbol", value: searchQuery }]
				: prev.length
					? []
					: prev,
		);
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
					placeholder="Search by symbol name..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="max-w-sm bg-purple-400/10 border-neutral-700 text-white placeholder:text-neutral-400"
				/>
			</div>
			<div className="flex items-center justify-between p-4">
				<div className="flex flex-1 items-center space-x-2">
					<div className="text-sm text-muted-foreground">
						{isLoading ? (
							<div className="h-4 bg-purple-400/10 rounded animate-pulse w-32" />
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
						disabled={isLoading || sorting.length === 0}
					>
						Reset
					</Button>
				</div>
			</div>
			<div
				className="overflow-hidden bg-purple-400/10 rounded"
				style={{ height: `${TABLE_HEIGHT}px` }}
			>
				<Table className="border-collapse ">
					{isLoading ? (
						<TableSkeleton columns={columns} />
					) : (
						<>
							<TableHeader className="sticky top-0 bg-purple-400/10 z-10">
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
			<div className="flex items-center justify-end space-x-2 p-4 bg-purple-400/10">
				<div className="flex-1 text-sm text-muted-foreground">
					{isLoading ? (
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
						disabled={isLoading || !table.getCanPreviousPage()}
						className="h-8 w-8 rounded-full p-0"
					>
						<ChevronLeft className="h-4 w-4" />
						<span className="sr-only">Previous page</span>
					</Button>
					<Button
						variant="secondary"
						size="icon"
						onClick={() => table.nextPage()}
						disabled={isLoading || !table.getCanNextPage()}
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
