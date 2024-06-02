import cn from '@libs/class'

const Col = ({ children, sticky = false }) => {
	return (
		<div
			className={cn(
				'[&>:first-child]:mt-0 [&>:last-child]:mb-0',
				sticky && 'xl:sticky xl:top-24'
			)}
		>
			{children}
		</div>
	)
}

export default Col
