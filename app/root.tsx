import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import AppLayout from "./components/layouts";
import "@fontsource/plus-jakarta-sans";
import { WagmiProvider } from "wagmi";
import { config } from "./lib/wagmi.config";
import { QueryClient, QueryClientContext } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { Toaster } from "sonner";
import sonnerStyles from "./styles/sonner.css?url";

export const links: Route.LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
	},
	{ rel: "stylesheet", href: sonnerStyles },
];

const queryClient = new QueryClient();

export default function App() {
	const [{ wagmiConfig, wagmiChains }] = useState(() => {
		const wagmiConfig = config;

		return { wagmiConfig, wagmiChains: wagmiConfig.chains };
	});
	return (
		<html lang="en" className="dark">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				{wagmiConfig && wagmiChains ? (
					<>
						<WagmiProvider config={wagmiConfig}>
							<QueryClientContext.Provider value={queryClient}>
								<RainbowKitProvider modalSize="compact">
									<AppLayout>
										<Outlet />
										<Toaster position="top-center" richColors={true} />
									</AppLayout>
								</RainbowKitProvider>
							</QueryClientContext.Provider>
						</WagmiProvider>
						<ScrollRestoration />
						<Scripts />
					</>
				) : (
					<>
						<ScrollRestoration />
						<Scripts />
					</>
				)}
			</body>
		</html>
	);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details =
			error.status === 404
				? "The requested page could not be found."
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<main className="pt-16 p-4 container mx-auto">
			<h1>{message}</h1>
			<p>{details}</p>
			{stack && (
				<pre className="w-full p-4 overflow-x-auto">
					<code>{stack}</code>
				</pre>
			)}
		</main>
	);
}
