'use client'

import CountUp from 'react-countup'

const Count = ({ name, num }: { name: string; num: number }) => {
	return (
		<div key={name} className="flex h-full w-1/2 flex-col items-center gap-3">
			<CountUp
				end={num}
				duration={2}
				className="font-display text-5xl font-light"
			/>
			<p className="font-display text-xl font-light">{name}</p>
		</div>
	)
}

export default Count
