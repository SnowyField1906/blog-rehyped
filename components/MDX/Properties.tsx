const Properties = ({ children }) => {
	return (
		<div className="my-6">
			<ul role="list" className="m-0 list-none divide-y divide-zinc-900/5 p-0">
				{children}
			</ul>
		</div>
	)
}

export default Properties
