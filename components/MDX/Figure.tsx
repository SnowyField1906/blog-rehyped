'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const Figure = ({ name, caption }: { name: string; caption?: string }) => {
	const [full, setFull] = useState(false)
	const pathName = usePathname()

	const src = pathName + '/assets/' + name

	const [shouldFullWidth, setShouldFullWidth] = useState(false)

	useEffect(() => {
		const img = new Image()
		img.src = src
		img.onload = () => {
			if (img.width / img.height > 1.75) {
				setShouldFullWidth(true)
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
					{shouldFullWidth ? (
						<img
							src={src}
							alt={caption}
							className="w-max cursor-default px-5"
						/>
					) : (
						<img
							src={src}
							alt={caption}
							className="w-full cursor-default px-5 sm:w-2/3 xl:w-1/2"
						/>
					)}
				</div>
			)}
			<figure className="cursor-pointer" onClick={() => setFull(true)}>
				<img src={src} alt={caption} className=" mx-auto w-full xl:w-1/2" />
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
