import Link from 'next/link'

import ArrowIcon from '@components/Icons/ArrowIcon'
import cn from '@libs/class'

import Loading from './Loading'

const variantStyles = {
	primary:
		'rounded-full py-2 px-6 text-white bg-zinc-900 hover:bg-zinc-600 hover:text-white',
	secondary:
		'rounded-full py-2 px-6 text-black bg-zinc-200/70 hover:bg-zinc-300/70 hover:ring-1 ring-inset ring-zinc-500 hover:ring-zinc-500',
	filled: 'rounded-full py-2 px-6 text-white bg-zinc-900 hover:bg-zinc-700',
	text: 'text-zinc-500 hover:text-zinc-900',
}

const Button = ({
	variant = 'primary',
	size = 'lg',
	className,
	children,
	arrow,
	onLoading,
	onDisabled,
	...props
}: any) => {
	const isAnchor = props?.href?.startsWith('http')
	props.target = isAnchor ? '_blank' : null

	const Component = props?.href ? (isAnchor ? 'a' : Link) : 'button'

	className = cn(
		'not-prose inline-flex gap-0.5 text-nowrap w-fit mx-auto justify-center overflow-hidden select-none font-normal font-sans place-items-center items-center transition-all duration-200 ease-in-out tracking-wide',
		variantStyles[variant],
		`text-${size}`,
		size === 'xl' && 'text-lg lg:text-xl px-9 py-3',
		size === 'lg' && 'text-base lg:text-lg px-7 lg:py-2',
		size === 'base' && 'text-sm lg:text-base px-6 lg:py-[6px]',
		size === 'sm' && 'text-xs lg:text-sm px-3 lg:py-[4px]',
		size === 'xs' && 'text-2xs lg:text-xs px-1 lg:py-1`',
		onDisabled ? 'pointer-events-none bg-zinc-600' : 'cursor-pointer',
		className
	)

	const arrowIcon = (
		<ArrowIcon
			className={cn(
				size === 'xl' && 'h-8 w-8',
				size === 'lg' && 'mt-0.5 h-7 w-7',
				size === 'base' && 'mt-0.5 h-6 w-6',
				size === 'sm' && 'mt-0.5 h-5 w-5',
				variant === 'text' && 'top-px',
				arrow === 'left' && '-ml-1 rotate-180',
				arrow === 'right' && '-mr-1'
			)}
		/>
	)

	return (
		<Component className={className} {...props}>
			{onLoading ? (
				<Loading size={size} />
			) : (
				<>
					{arrow === 'left' && arrowIcon}
					{children}
					{arrow === 'right' && arrowIcon}
				</>
			)}
		</Component>
	)
}

export default Button
