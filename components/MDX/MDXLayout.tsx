'use client'

import { MDXComponents } from 'mdx/types'
import { getMDXComponent } from 'mdx-bundler/client'
import Link from 'next/link'
import { useMemo } from 'react'

import Button from '@components/Common/Button'
import Image from '@components/Common/Image'
import Code from '@components/MDX/Code'
import Col from '@components/MDX/Col'
import Figure from '@components/MDX/Figure'
import Note from '@components/MDX/Note'
import Pre from '@components/MDX/Pre'
import Properties from '@components/MDX/Properties'
import Property from '@components/MDX/Property'
import Row from '@components/MDX/Row'
import TOCInline from '@components/MDX/TOCInline'
import PostLayout from '@layouts/PostLayout'

const mdxComponents: MDXComponents = {
	Note,
	Row,
	Col,
	Properties,
	Property,
	Figure,
	Button,
	Image,
	TOCInline,
	a: Link as any,
	code: Code as any,
	pre: Pre as any,
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
