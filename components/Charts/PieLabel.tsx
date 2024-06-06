const RADIAN = Math.PI / 180

const START_LIMIT = 260
const END_LIMIT = 120
const MIDDLE_LIMIT = 40

const PieLabel = ({
	activated,
	name,
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	percent,
}) => {
	if (activated || percent < 0.05) {
		return null
	}

	const anchor =
		midAngle > START_LIMIT
			? 'start'
			: midAngle > END_LIMIT
				? 'end'
				: midAngle > MIDDLE_LIMIT
					? 'middle'
					: 'start'

	const offset = anchor === 'middle' ? 1.75 : 1.5

	const radius = innerRadius + (outerRadius - innerRadius) * offset
	const x = cx + radius * Math.cos(-midAngle * RADIAN)
	const y = cy + radius * Math.sin(-midAngle * RADIAN)

	return (
		<text
			x={x}
			y={y}
			fill="black"
			fontSize={14}
			textAnchor={anchor}
			dominantBaseline="central"
		>
			{name}
		</text>
	)
}

export default PieLabel
