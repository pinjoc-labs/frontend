import Footer from "./footer";
import Header from "./header";
import type { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
	return (
		<main className="flex flex-col h-full min-h-screen overflow-x-hidden">
			<Header />
			<div className="flex-1">{children}</div>
			<Footer />
		</main>
	);
}
