const Newsletter = () => {
	return (
		<div className="flex w-full gap-2 text-sm lg:w-1/2 lg:text-base xl:w-1/3 xl:text-lg">
			<input
				type="email"
				placeholder="Enter your email"
				className="w-full border border-zinc-900 bg-zinc-100 p-1 lg:p-2"
			/>
			<button className="transform border border-zinc-900 px-3 py-1 transition-colors duration-200 ease-in-out hover:bg-zinc-900 hover:text-white lg:px-5 lg:py-2">
				subscribe
			</button>
		</div>
	)
}

export default Newsletter
