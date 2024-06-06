import React, { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

import { ClipboardIcon } from '@components/Icons/ClipboardIcon'

const Pre = (pre) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
	const codeChunk = (pre as any).children[0]?.props?.children

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [copyTip, setCopyTip] = useState('Copy code')

	const language =
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
		(pre as any).children[0]?.props.className.replace(
			/language-/g,
			''
		) as string

	return (
		<div className="relative overflow-x-hidden">
			{/* <button
				className="tooltip tooltip-left absolute right-0 top-0 z-40"
				data-tip={copyTip}
			>
				<CopyToClipboard
					text={codeChunk}
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onCopy={async () => {
						setCopyTip('Copied')
						await new Promise((resolve) => setTimeout(resolve, 500))
						setCopyTip(`Copy code`)
					}}
				>
					<ClipboardIcon className="h-20 w-20 cursor-pointer hover:text-blue-600" />
				</CopyToClipboard>
			</button>
			<span
				style={{
					bottom: 0,
					right: 0,
				}}
				className="absolute z-40 mb-5 mr-1 rounded-lg bg-base-content/40 p-1 text-xs uppercase text-base-300 backdrop-blur-sm"
			>
				{language}
			</span> */}
			<pre {...pre}></pre>
		</div>
	)
}

export default Pre
