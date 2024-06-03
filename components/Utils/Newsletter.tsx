const Newsletter = () => {
	return (
		<div className="flex w-1/3 gap-2">
			<input
				type="email"
				placeholder="Enter your email"
				className="w-full border border-zinc-900 bg-zinc-100 p-2"
			/>
			<button className="transform border border-zinc-900 px-5 py-2 transition-colors duration-200 ease-in-out hover:bg-zinc-900 hover:text-white">
				subscribe
			</button>
		</div>
	)
}

export default Newsletter
