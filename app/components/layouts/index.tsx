import Footer from "./footer";
import Header from "./header";
import type { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
	return (
		<main className="grid min-h-screen grid-rows-[auto_1fr_auto]">
			<Header />
			{children}
			<Footer />
		</main>
	);
}
