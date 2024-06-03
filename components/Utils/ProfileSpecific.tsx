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
				'flex w-[30vw] flex-col gap-10 border border-zinc-500 p-10',
				className
			)}
		>
			<p className="font-display text-3xl text-zinc-900">{title}</p>
			<div className="flex flex-col gap-3 font-display text-base font-light">
				{children}
			</div>
		</div>
	)
}

export default ProfileSpecific
