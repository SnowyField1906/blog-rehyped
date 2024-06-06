'use client'

import { platform } from 'os'

import { Sector } from 'recharts'

import { formatTime } from '@libs/date'

const RADIAN = Math.PI / 180

const PieShape = ({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	startAngle,
	endAngle,
	payload,
	percent,
	value,
}: any) => {
	const sin = Math.sin(-RADIAN * midAngle)
	const cos = Math.cos(-RADIAN * midAngle)
	const sx = cx + (outerRadius + 10) * cos
	const sy = cy + (outerRadius + 10) * sin
	const mx = cx + (outerRadius + 30) * cos
	const my = cy + (outerRadius + 30) * sin
	const ex = mx + (cos >= 0 ? 1 : -1) * 22
	const ey = my

	return (
		<g>
			<text
				x={cx}
				y={cy - 10}
				dy={8}
				textAnchor="middle"
				fill="#222"
				fontSize={12}
			>
				{formatTime(value)} on
			</text>
			<text
				x={cx}
				y={cy + 10}
				dy={8}
				textAnchor="middle"
				fontWeight={500}
				fill="black"
			>
				{payload.name}
			</text>
			<Sector
				cx={cx}
				cy={cy}
				innerRadius={innerRadius}
				outerRadius={outerRadius}
				startAngle={startAngle}
				endAngle={endAngle}
				fill="#222"
			/>
			<Sector
				cx={cx}
				cy={cy}
				startAngle={startAngle}
				endAngle={endAngle}
				innerRadius={outerRadius + 6}
				outerRadius={outerRadius + 10}
				fill="#222"
			/>
		</g>
	)
}

export default PieShape
