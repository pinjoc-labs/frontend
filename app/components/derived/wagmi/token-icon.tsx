export type TokenIconProps = {
	token: string;
	imageUrl: string;
};

export const TokenIcon = ({
	from,
	to,
}: {
	from: TokenIconProps;
	to: TokenIconProps;
}) => {
	return (
		<div className="flex items-center justify-center">
			<img
				src={from.imageUrl}
				alt={from.token}
				className="size-10 border-4 bg-white rounded-full"
			/>
			<img
				src={to.imageUrl}
				alt={to.token}
				className="size-10 border-4 border-gray-900 -ml-3 bg-white rounded-full"
			/>
		</div>
	);
};
