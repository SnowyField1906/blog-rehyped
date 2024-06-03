import cn from '@libs/class'

const Title = ({
	primary,
	secondary,
	isMain = true,
}: {
	primary: string
	secondary: string
	isMain?: boolean
}) => {
	return (
		<div className="text-center text-black">
			<p
				className={cn(
					'font-heading font-normal',
					isMain ? 'text-6xl' : 'text-5xl'
				)}
			>
				{isMain ? `My ${primary}` : primary}
			</p>
			<hr className="mx-auto my-5 h-min w-1/3 border border-zinc-900 lg:my-8" />
			<p className="font-display text-xl font-light">{secondary}</p>
		</div>
	)
}

export default Title
