import { CodeBlock, Pre as FPre } from 'fumadocs-ui/components/codeblock'

const Pre = ({ ref: _ref, title, ...props }) => {
	return (
		<CodeBlock title={title}>
			<FPre {...props} />
		</CodeBlock>
	)
}

export default Pre
