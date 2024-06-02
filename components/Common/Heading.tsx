import React from 'react'

const Heading = ({ heading }) => {
	return (
		<div className="py-8 text-center font-heading text-3xl font-light text-black lg:py-12 lg:text-5xl">
			<p>{heading}</p>
			<hr className="mx-auto mt-8 h-min w-1/3 border border-zinc-900 lg:mt-12" />
		</div>
	)
}

export default Heading
