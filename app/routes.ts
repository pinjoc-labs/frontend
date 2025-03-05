import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("pages/borrow-lending/index.tsx"),
	route("portofolio", "pages/portofolio/index.tsx"),
	route("history", "pages/history/index.tsx"),
	route("tokenized-bond", "pages/tokenized-bond/index.tsx"),
	route("orderbook", "pages/orderbook/index.tsx"),
] satisfies RouteConfig;
