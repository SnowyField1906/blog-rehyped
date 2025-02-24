'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import cn from '@libs/class'

const Figure = ({ name, caption }: { name: string; caption?: string }) => {
	const [full, setFull] = useState(false)
	const pathName = usePathname()

	const src = pathName + '/assets/' + name

	const [className, setClassName] = useState('')

	useEffect(() => {
		const img = new Image()
		img.src = src
		img.onload = () => {
			if (img.width / img.height > 1.75) {
				setClassName('mx-auto w-max cursor-default px-5 xl:w-2/3')
			} else {
				setClassName('mx-auto w-full cursor-default px-5 sm:w-2/3 xl:w-1/2')
			}
		}
	}, [])

	return (
		<div className="not-prose relative my-10 select-none">
			{full && (
				<div
					className="fixed inset-0 z-[100] flex h-screen w-screen cursor-pointer items-center justify-center bg-black bg-opacity-70"
					onClick={() => setFull(false)}
				>
					<img src={src} alt={caption} className="sm:w-2/3 xl:w-1/2" />
				</div>
			)}
			<figure className="cursor-pointer" onClick={() => setFull(true)}>
				<img src={src} alt={caption} className={className} />
				{caption && (
					<figcaption>
						<p className="mx-auto mt-2 w-full text-center font-sans text-base font-light text-zinc-500">
							{caption}
						</p>
					</figcaption>
				)}
			</figure>
		</div>
	)
}

export default Figure
