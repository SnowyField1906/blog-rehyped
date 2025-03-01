'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { deserializeParams } from '@libs/api'
import cn from '@libs/class'

const Tag = ({
	name = '',
	count,
	page = 'posts',
	is = 'tag',
}: {
	name?: string
	count?: number
	page?: string
	is?: string
}): JSX.Element => {
	const searchParams: any = useSearchParams()
	const tag = deserializeParams(searchParams)[is] ?? ''

	const isActive = tag === name

	return (
		<Link
			href={name === '' ? `/${page}` : `/${page}?${is}=${name}`}
			className={cn(
				'text-nowrap text-xs uppercase lg:text-sm lg:tracking-wider xl:text-base',
				isActive
					? 'stable-minimal-link pointer-events-none text-black'
					: 'minimal-link text-zinc-800'
			)}
		>
			{name === '' ? 'View All' : `${name}${count ? ` (${count})` : ''}`}
		</Link>
	)
}

export default Tag
