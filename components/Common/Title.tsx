import cn from '@libs/class'

const Title = ({
	primary,
	secondary,
	type = 'main',
}: {
	primary: string
	secondary: string
	type?: 'main' | 'activity' | 'article' | 'tag'
}) => {
	return (
		<div className="text-center text-black">
			<p
				className={cn(
					'font-heading font-normal',
					type !== 'article'
						? 'text-4xl lg:text-5xl xl:text-6xl'
						: 'text-3xl lg:text-4xl xl:text-5xl'
				)}
			>
				{
					{
						article: primary,
						activity: `My ${primary} Activity`,
						main: `My ${primary}`,
						tag: primary,
					}[type]
				}
			</p>
			<hr className="mx-auto my-5 h-min w-1/3 border border-zinc-900 lg:my-8" />
			<p className="font-display text-base font-light lg:text-lg xl:text-xl">
				{secondary}
			</p>
		</div>
	)
}

export default Title
