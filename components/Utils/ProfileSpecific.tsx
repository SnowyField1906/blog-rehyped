import cn from '@libs/class'

const ProfileSpecific = ({
	title,
	className,
	children,
}: {
	title: string
	className?: string
	children: React.ReactNode
}) => {
	return (
		<div
			className={cn(
				'flex w-full flex-col gap-5 border border-zinc-500 p-5 lg:w-[30vw] lg:gap-10 lg:p-10',
				className
			)}
		>
			<p className="font-display text-xl text-zinc-900 lg:text-2xl xl:text-3xl">
				{title}
			</p>
			<div className="flex flex-col gap-3 font-display text-sm font-light lg:text-base">
				{children}
			</div>
		</div>
	)
}

export default ProfileSpecific
