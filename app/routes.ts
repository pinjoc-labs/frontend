import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("pages/borrow-lending/index.tsx"),
	route("portofolio", "pages/portofolio/index.tsx"),
	route("history", "pages/history/index.tsx"),
	route("tokenized-bond", "pages/tokenized-bond/index.tsx"),
	route("tokenizedbond-market/:id", "pages/tokenized-bond-market/index.tsx"),
	route("orderbook/:id", "pages/orderbook/index.tsx"),
] satisfies RouteConfig;
