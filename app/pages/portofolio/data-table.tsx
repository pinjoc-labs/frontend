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
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";

// Constants
const TABLE_HEIGHT = 500; // Fixed table height

// Sorting indicator component
export function SortingIndicator({ column }: { column: any }) {
	return column.getIsSorted() ? (
		<span className="ml-2">{column.getIsSorted() === "asc" ? "↑" : "↓"}</span>
	) : null;
}

// Skeleton Table for loading state
function TableSkeleton<TData, TValue>({
	columns,
}: {
	columns: ColumnDef<TData, TValue>[];
}) {
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

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [loading, setLoading] = React.useState(true);
	const [sorting, setSorting] = React.useState<SortingState>([
		{ id: "asset", desc: true },
	]);

	React.useEffect(() => {
		// Simulate loading data
		const timer = setTimeout(() => setLoading(false), 2000);
		return () => clearTimeout(timer);
	}, []);

	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);

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
						<TableSkeleton columns={columns} />
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
								{table.getRowModel().rows.map((row) => (
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
								))}
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
