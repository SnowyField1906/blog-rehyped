'use client'

import CountUp from 'react-countup'

const Count = ({ name, num }: { name: string; num: number }) => {
	return (
		<div
			key={name}
			className="flex h-full w-1/2 flex-col items-center gap-1 lg:gap-2 xl:gap-3"
		>
			<CountUp
				end={num}
				duration={2}
				className="font-display text-3xl font-light lg:text-4xl xl:text-5xl"
			/>
			<p className="text-nowrap font-display text-base font-light lg:text-lg xl:text-xl">
				{name}
			</p>
		</div>
	)
}

export default Count
