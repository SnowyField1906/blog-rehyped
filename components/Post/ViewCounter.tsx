'use client'

import { useEffect, useState } from 'react'

import { GET, POST } from '@libs/api'

const ViewCounter = ({
	slug,
	className,
	inc = false,
}: {
	slug: string
	className?: string
	inc?: boolean
}) => {
	const [view, setView] = useState<string>('–––')

	useEffect(() => {
		;(async () => {
			const view: number | null = inc
				? await POST('/view', { slug })
				: await GET('/view', { slug })

			setView(view?.toLocaleString() ?? '–––')
		})()
	}, [])

	return <span className={className}>{view} views</span>
}

export default ViewCounter
