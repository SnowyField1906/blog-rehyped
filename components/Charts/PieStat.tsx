'use client'

import { useCallback, useEffect, useState } from 'react'
import { Pie, PieChart } from 'recharts'

import PieLabel from '@components/Charts/PieLabel'
import PieShape from '@components/Charts/PieShape'

const PieStat = ({ data, dataKey }) => {
	const [isClient, setIsClient] = useState(false)
	const [activeIndex, setActiveIndex] = useState(0)
	const onPieEnter = useCallback(
		(_, index) => {
			setActiveIndex(index)
		},
		[setActiveIndex]
	)

	useEffect(() => {
		setIsClient(true)
	}, [])
	if (!isClient) return null

	return (
		<div className="flex w-full justify-center overflow-hidden">
			<PieChart
				width={400}
				height={400}
				style={{ width: '150%', height: '150%' }}
			>
				<Pie
					activeIndex={activeIndex}
					activeShape={PieShape}
					data={data}
					cx={200}
					cy={200}
					innerRadius={60}
					outerRadius={80}
					dataKey={dataKey}
					label={(props) => (
						<PieLabel {...props} activated={activeIndex === props.index} />
					)}
					onMouseEnter={onPieEnter}
				/>
			</PieChart>
		</div>
	)
}

export default PieStat
