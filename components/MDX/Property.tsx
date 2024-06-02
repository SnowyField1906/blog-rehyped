const Property = ({ name, type, children }) => {
	return (
		<li className="m-0 px-0 py-4 first:pt-0 last:pb-0">
			<dl className="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
				<dt className="sr-only">Name</dt>
				<dd>
					<p className="text-lg font-bold text-zinc-600">{name}</p>
				</dd>
				<dt className="sr-only">Type</dt>
				<dd className="font-mono text-xs text-zinc-400">{type}</dd>
				<dt className="sr-only">Description</dt>
				<dd className="w-full flex-none text-zinc-600 [&>:first-child]:mt-0 [&>:last-child]:mb-0">
					{children}
				</dd>
			</dl>
		</li>
	)
}

export default Property
