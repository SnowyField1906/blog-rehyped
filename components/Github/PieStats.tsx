import PieStat from '@components/Charts/PieStat'

const PieStats = ({ weekdays, operatingSystems, editors }) => {
	return (
		<div className="mx-auto flex w-full flex-col justify-center">
			<p className="font-display text-xl text-zinc-900 lg:text-2xl xl:text-3xl">
				Coding time distribution
			</p>
			<div className="flex -translate-y-16 flex-col justify-around lg:flex-row">
				<div className="h-48 lg:h-auto">
					<PieStat data={weekdays} dataKey="total" />
				</div>
				<div className="h-48 lg:h-auto">
					<PieStat data={operatingSystems} dataKey="total_seconds" />
				</div>
				<div className="h-48 lg:h-auto">
					<PieStat data={editors} dataKey="total_seconds" />
				</div>
			</div>
		</div>
	)
}

export default PieStats
