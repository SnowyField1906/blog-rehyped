'use client'

import { useEffect, useState } from 'react'
import {
	Area,
	AreaChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'

import {
	formatDate,
	formatTime,
	getDateFromDayOrder,
	parseMonth,
} from '@libs/date'

const CodingHistory = ({ days }) => {
	const [isClient, setIsClient] = useState(false)
	useEffect(() => {
		setIsClient(true)
	}, [])
	if (!isClient) return null

	return (
		<div className="mx-auto mt-20 flex h-60 w-full flex-col justify-center lg:mt-0">
			<p className="text-center font-display text-xl text-zinc-900 lg:text-2xl xl:text-3xl">
				Coding time history
			</p>
			<div className="mx-auto flex w-11/12 -translate-y-16 flex-col justify-around lg:flex-row">
				<ResponsiveContainer width="100%" height={400}>
					<AreaChart width={1200} height={400} data={days}>
						<defs>
							<linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
								<stop offset="30%" stopColor="black" stopOpacity={1} />
								<stop offset="95%" stopColor="black" stopOpacity={0.3} />
							</linearGradient>
						</defs>
						<Tooltip
							labelFormatter={(value) => formatDate(getDateFromDayOrder(value))}
							formatter={(value, name) => [`${formatTime(value, true, true)}`]}
						/>
						<Area
							type="monotone"
							dataKey="total"
							stroke="#222"
							fill="url(#colorHours)"
							fillOpacity={1}
						/>
					</AreaChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}

export default CodingHistory
