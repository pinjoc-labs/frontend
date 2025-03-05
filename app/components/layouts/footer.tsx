import { HeaderLink, links, type HeaderLinkProps } from "./header";

const externalLinks: HeaderLinkProps[] = [
	{
		href: "https://github.com/pinjoc-labs",
		children: "Source Code",
		isExternal: true,
	},
	{
		href: "https://github.com/pinjoc-labs/docs",
		children: "Docs",
		isExternal: true,
	},
];

export default function Footer() {
	return (
		<header className="w-screen flex items-center border-t border-gray-600 p-4 gap-x-8 mt-4 shadow-md">
			<h1 className="flex items-center text-xl font-bold">
				<span>PINJ</span>
				<img src="/logo.png" alt="Pinjoc Logo" className="size-6" />
				<span>C</span>
			</h1>
			<nav className="flex items-center gap-6">
				{[...links, ...externalLinks].map((link) => (
					<HeaderLink key={`footer-${link.href}`} {...link} />
				))}
			</nav>
		</header>
	);
}
