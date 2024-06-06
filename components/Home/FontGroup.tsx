const FontGroup = () => {
	return (
		<div className="my-5 grid w-full grid-cols-2 place-items-center items-center gap-5 font-light lg:grid-cols-6 xl:grid-cols-5">
			<div className="col-span-1 flex flex-col place-items-center items-center justify-center font-sans lg:col-span-2 xl:col-span-1">
				<p className="text-nowrap font-sans text-xl lg:text-2xl xl:text-3xl">
					Sarabun
				</p>
				<p className="text-base lg:text-lg xl:text-xl">(sans-serif)</p>
			</div>
			<div className="col-span-1 flex flex-col place-items-center items-center justify-center font-serif lg:col-span-2 xl:col-span-1">
				<p className="text-nowrap font-serif text-xl lg:text-2xl xl:text-3xl">
					Noto Serif JP
				</p>
				<p className="text-base lg:text-lg xl:text-xl">(serif)</p>
			</div>
			<div className="font-mono col-span-1 flex flex-col place-items-center items-center justify-center lg:col-span-2 xl:col-span-1">
				<p className="font-mono text-nowrap text-xl lg:text-2xl xl:text-3xl">
					Fira Code
				</p>
				<p className="text-base lg:text-lg xl:text-xl">(monospace)</p>
			</div>
			<div className="col-span-1 flex flex-col place-items-center items-center justify-center font-display lg:col-span-3 xl:col-span-1">
				<p className="text-nowrap font-display text-xl lg:text-2xl xl:text-3xl">
					Playfair Display
				</p>
				<p className="text-base lg:text-lg xl:text-xl">(display)</p>
			</div>
			<div className="col-span-2 flex flex-col place-items-center items-center justify-center font-heading lg:col-span-3 xl:col-span-1">
				<p className="text-nowrap font-heading text-xl lg:text-2xl xl:text-3xl">
					Cormorant SC
				</p>
				<p className="text-base lg:text-lg xl:text-xl">(heading)</p>
			</div>
		</div>
	)
}

export default FontGroup
