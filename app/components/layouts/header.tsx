import { cn } from "~/lib/utils";
import ConnectWallet from "../derived/wagmi/button-connect";
import { Link, useLocation } from "react-router";

export const links: HeaderLinkProps[] = [
	{ href: "/", children: "Borrow/Lend" },
	{ href: "/portofolio", children: "Portofolio" },
	{ href: "/tokenized-bond", children: "Tokenized Bond" },
	{ href: "/history", children: "History" },
];

export default function Header() {
	return (
		<header className="w-full max-w-screen flex items-center border-b border-gray-600 h-16 justify-between p-4 gap-x-8 shadow-md">
			<h1 className="flex items-center text-3xl font-bold">
				<span>PINJ</span>
				<img src="/logo.png" alt="Pinjoc Logo" className="size-8" />
				<span>C</span>
			</h1>
			<nav className="flex items-center gap-6">
				{links.map((link) => (
					<HeaderLink key={`header-${link.href}`} {...link} />
				))}
			</nav>
			<ConnectWallet />
		</header>
	);
}

export type HeaderLinkProps = {
	href: string;
	children: React.ReactNode;
	isExternal?: boolean;
};

export const HeaderLink = ({
	href,
	children,
	isExternal = false,
}: HeaderLinkProps) => {
	const { pathname } = useLocation();
	const isActive = pathname === href;

	if (isExternal) {
		return (
			<a
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				className={cn(
					"relative inline-block text-sm",
					"after:absolute after:content-[''] after:w-full after:h-[2px]",
					"after:bottom-0 after:left-0 after:bg-gray-300",
					"after:origin-bottom-right after:scale-x-0",
					"after:transition-transform after:duration-[0.25s] after:ease-out",
					"hover:after:scale-x-100 hover:after:origin-bottom-left",
					isActive
						? "text-purple-300 font-semibold"
						: "text-gray-50 font-normal",
				)}
			>
				{children}
			</a>
		);
	}

	return (
		<Link
			to={href}
			className={cn(
				"relative inline-block text-sm",
				"after:absolute after:content-[''] after:w-full after:h-[2px]",
				"after:bottom-0 after:left-0 after:bg-gray-300",
				"after:origin-bottom-right after:scale-x-0",
				"after:transition-transform after:duration-[0.25s] after:ease-out",
				"hover:after:scale-x-100 hover:after:origin-bottom-left",
				isActive ? "text-purple-300 font-semibold" : "text-gray-50 font-normal",
			)}
		>
			{children}
		</Link>
	);
};
