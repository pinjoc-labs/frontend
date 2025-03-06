import Footer from "./footer";
import Header from "./header";
import type { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
	return (
		<main className="flex flex-col min-h-screen">
			<Header />
			<div className="flex-1 overflow-y-auto">{children}</div>
			<Footer />
		</main>
	);
}
