import InfoIcon from '@components/Icons/InfoIcon'

const Note = ({ children }) => {
	return (
		<div className="my-6 flex gap-2.5 rounded-2xl border border-primary-500/20 bg-primary-50/50 p-4 leading-6 text-primary-900">
			<InfoIcon className="mt-1 h-4 w-4 flex-none fill-primary-600 stroke-white" />
			<div className="[&>:first-child]:mt-0 [&>:last-child]:mb-0">
				{children}
			</div>
		</div>
	)
}

export default Note
