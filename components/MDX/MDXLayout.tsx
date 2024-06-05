'use client'

import { MDXComponents } from 'mdx/types'
import { getMDXComponent } from 'mdx-bundler/client'
import Link from 'next/link'
import { useMemo } from 'react'

import Button from '@components/Common/Button'
import Image from '@components/Common/Image'
import Figure from '@components/MDX/Figure'
import Pre from '@components/MDX/Pre'
import PostLayout from '@layouts/PostLayout'

const mdxComponents: MDXComponents = {
	Figure,
	Button,
	Image,
	pre: Pre as any,
	a: Link as any,
	// h2: (props) => <Heading level={2} {...props} />,
	// h3: (props) => <Heading level={3} {...props} />,
	// h4: (props) => <Heading level={4} {...props} />,
	// h5: (props) => <Heading level={5} {...props} />,
	wrapper: ({
		components,
		children,
		markdown,
	}: {
		components: any
		children: JSX.Element
		markdown: Markdown
	}) => {
		return <PostLayout markdown={markdown}>{children}</PostLayout>
	},
}

const MDXLayout = ({ markdown }: { markdown: Markdown }) => {
	const Component = useMemo(
		() => getMDXComponent(markdown.code),
		[markdown.code]
	)

	return <Component components={mdxComponents} markdown={markdown} />
}

export default MDXLayout
