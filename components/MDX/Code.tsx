import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown'
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python'
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript'
import { solarizedlight } from 'react-syntax-highlighter/dist/cjs/styles/prism'

SyntaxHighlighter.registerLanguage('typescript', typescript)
SyntaxHighlighter.registerLanguage('python', python)
SyntaxHighlighter.registerLanguage('markdown', markdown)

const Code = ({ inline, className, ...props }) => {
	const hasLang = /language-(\w+)/.exec(className || '')
	return !inline && hasLang ? (
		<SyntaxHighlighter
			style={solarizedlight}
			language={hasLang[1]}
			PreTag="div"
			className="scrollbar-thin scrollbar-track-base-content/5 scrollbar-thumb-base-content/40 scrollbar-track-rounded-md scrollbar-thumb-rounded mockup-code"
			showLineNumbers={false}
		>
			{String(props.children).replace(/\n$/, '')}
		</SyntaxHighlighter>
	) : (
		<code className={className} {...props} />
	)
}

export default Code
