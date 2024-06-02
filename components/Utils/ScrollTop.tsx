'use client'

import { useState } from 'react'
import { FaPaw } from 'react-icons/fa'
import useSound from 'use-sound'

const CAT_SOUNDS = 4

const ScrollTop = () => {
	const [random, setRandom] = useState(1)
	const [ThemeSound] = useSound(`/static/sounds/meow/${random}.mp3`)

	const handleScrollTop = () => {
		setRandom(Math.floor(Math.random() * CAT_SOUNDS) + 1)
		ThemeSound()
		window.scrollTo({ top: 0 })
	}

	return (
		<div className="group fixed bottom-5 right-1 z-20 grid gap-3 lg:bottom-8 lg:right-8">
			<p className="invisible select-none text-sm font-light text-zinc-500 group-hover:visible">
				SCROLL TOP
			</p>
			<button
				aria-label="Scroll To Top"
				type="button"
				onClick={handleScrollTop}
				className="pushable mx-auto w-min"
			>
				<span className="shadow"></span>
				<span className="edge"></span>
				<span className="front">
					<FaPaw className="h-5 w-5" />
				</span>
			</button>
		</div>
	)
}

export default ScrollTop
