'use client'

import { useRef, useState } from 'react'

const Pre = (props) => {
	const textInput = useRef(null)
	const [hovered, setHovered] = useState(false)
	const [copied, setCopied] = useState(false)

	const onEnter = () => {
		setHovered(true)
	}
	const onExit = () => {
		setHovered(false)
		setCopied(false)
	}
	const onCopy = () => {
		setCopied(true)
		const textContent: string = (textInput.current as any)?.textContent || ''
		navigator.clipboard.writeText(textContent)
		setTimeout(() => {
			setCopied(false)
		}, 2000)
	}

	return (
		<div
			ref={textInput}
			onMouseEnter={onEnter}
			onMouseLeave={onExit}
			className="group relative w-[83vw] rounded-lg bg-zinc-800 p-4 text-xs lg:w-full"
		>
			{hovered && (
				<button
					aria-label="Copy code"
					type="button"
					className={`absolute right-2 top-2 h-8 w-8 rounded border bg-zinc-700 p-1 ${
						copied
							? 'border-zinc-400 focus:border-zinc-400 focus:outline-none'
							: 'border-zinc-300'
					}`}
					onClick={onCopy}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						stroke="currentColor"
						fill="none"
						className={copied ? 'text-zinc-400' : 'text-zinc-300'}
					>
						{copied ? (
							<>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
								/>
							</>
						) : (
							<>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
								/>
							</>
						)}
					</svg>
				</button>
			)}
			<pre className="overflow-hidden text-wrap bg-zinc-800 text-black">
				{props.children}
			</pre>
		</div>
	)
}

export default Pre
