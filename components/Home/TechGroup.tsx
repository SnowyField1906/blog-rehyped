const TechGroup = () => {
	return (
		<div className="my-5 grid w-full grid-cols-3 place-items-center items-center gap-4 lg:gap-12 xl:gap-20">
			<div className="flex w-full items-center justify-center">
				<img
					className="w-full xl:w-2/3"
					src="/static/typescript.png"
					alt="typescript"
				/>
			</div>
			<div className="flex w-full items-center justify-center">
				<img
					className="w-full xl:w-2/3"
					src="/static/nextjs.png"
					alt="nextjs"
				/>
			</div>
			<div className="flex w-full items-center justify-center">
				<img
					className="w-full xl:w-2/3"
					src="/static/tailwind.png"
					alt="tailwindcss"
				/>
			</div>
		</div>
	)
}

export default TechGroup
