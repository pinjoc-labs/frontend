import { type ColumnDef } from "@tanstack/react-table";
import { Clipboard, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { SortingIndicator } from "./data-table";
import type { IHistory } from "./types";

// Function untuk truncate ID & Hash di tengah
const truncateMiddle = (text: string, startLength = 6, endLength = 6) => {
	if (text.length <= startLength + endLength) return text;
	return `${text.slice(0, startLength)}...${text.slice(-endLength)}`;
};

// Function untuk mengubah timestamp ke format tanggal
const formatDate = (timestamp: number) => {
	return new Date(timestamp * 1000).toLocaleString("en-US", {
		year: "numeric",
		month: "short",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});
};

// Component Copy Button
const CopyButton = ({ text }: { text: string }) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(text);
		setCopied(true);
		setTimeout(() => setCopied(false), 1500); // Reset setelah 1.5 detik
	};

	return (
		<Button variant="ghost" onClick={handleCopy} className="p-1 cursor-pointer">
			{copied ? (
				<Check className="w-4 h-4 text-green-500" />
			) : (
				<Clipboard className="w-4 h-4" />
			)}
		</Button>
	);
};

// Columns definition
export const columns: ColumnDef<IHistory>[] = [
	{
		accessorKey: "id",
		header: "ID",
		cell: ({ row }) => (
			<div className="flex items-center gap-2 min-w-[200px]">
				<span>{truncateMiddle(row.original.id)}</span>
				<CopyButton text={row.original.id} />
			</div>
		),
	},
	{
		accessorKey: "type",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				className="px-0 font-normal cursor-pointer hover:text-white hover:bg-transparent"
			>
				Type
				<SortingIndicator column={column} />
			</Button>
		),
	},
	{
		accessorKey: "token",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				className="px-0 font-normal cursor-pointer hover:text-white hover:bg-transparent"
			>
				Token
				<SortingIndicator column={column} />
			</Button>
		),
	},
	{
		accessorKey: "blockNumber",
		header: "Block Number",
	},
	{
		accessorKey: "hash",
		header: "Hash",
		cell: ({ row }) => (
			<div className="flex items-center gap-2 min-w-[250px]">
				<span>{truncateMiddle(row.original.hash)}</span>
				<CopyButton text={row.original.hash} />
			</div>
		),
	},
	{
		accessorKey: "timestamp",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				className="px-0 font-normal cursor-pointer hover:text-white hover:bg-transparent"
			>
				Timestamp
				<SortingIndicator column={column} />
			</Button>
		),
		cell: ({ row }) => <span>{formatDate(row.original.timestamp)}</span>,
		sortingFn: (rowA, rowB) =>
			rowA.original.timestamp - rowB.original.timestamp, // Sorting tetap berdasarkan angka
	},
];
