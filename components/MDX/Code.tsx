const Code = ({ children, ...props }) => {
	return (
		<p {...props} className=" bg-zinc-800 text-white">
			{children}
		</p>
	)
}

export default Code
