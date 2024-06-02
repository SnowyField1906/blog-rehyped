'use client'

import { useState } from 'react'

const Figure = ({ src, children }) => {
	const [full, setFull] = useState(false)

	return (
		<div className="relative select-none">
			{full && (
				<div
					className="fixed inset-0 z-[100] flex h-screen w-screen cursor-pointer items-center justify-center bg-black bg-opacity-70"
					onClick={() => setFull(false)}
				>
					<img
						src={src}
						alt={children}
						className="w-full cursor-default px-5 sm:w-2/3 xl:w-1/2"
					/>
				</div>
			)}
			<figure className="cursor-pointer" onClick={() => setFull(true)}>
				<img
					src={src}
					alt={children}
					className=" mx-auto w-full sm:w-1/2 xl:w-1/3"
				/>
				<figcaption>
					<p className="w-full text-sm">{children}</p>
				</figcaption>
			</figure>
		</div>
	)
}

export default Figure
