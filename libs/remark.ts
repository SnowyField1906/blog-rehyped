import fs from 'fs'

import { slug } from 'github-slugger'
import sizeOf from 'image-size'
import { load } from 'js-yaml'
import { toString } from 'mdast-util-to-string'
import { visit } from 'unist-util-visit'

export const remarkCodeTitles = () => {
    return (tree) =>
        visit(tree, 'code', (node, index, parent) => {
            const nodeLang = node.lang || ''
            let language = ''
            let title = ''

            if (nodeLang.includes(':')) {
                language = nodeLang.slice(0, nodeLang.search(':'))
                title = nodeLang.slice(
                    nodeLang.search(':') + 1,
                    nodeLang.length
                )
            }

            if (!title) {
                return
            }

            const className = 'remark-code-title'

            const titleNode = {
                type: 'mdxJsxFlowElement',
                name: 'div',
                attributes: [
                    {
                        type: 'mdxJsxAttribute',
                        name: 'className',
                        value: className,
                    },
                ],
                children: [{ type: 'text', value: title }],
                data: { _xdmExplicitJsx: true },
            }

            parent.children.splice(index, 0, titleNode)
            node.lang = language
        })
}

export const remarkExtractFrontmatter = () => {
    return (tree, file) => {
        visit(tree, 'yaml', (node, index, parent) => {
            file.data.frontmatter = load(node.value)
        })
    }
}

export const remarkImgToJsx = () => {
    return (tree) => {
        visit(
            tree,
            // only visit p tags that contain an img element
            (node) =>
                node.type === 'paragraph' &&
                tree.children.some((n) => n.type === 'image'),
            (node) => {
                const imageNode = node.children.find((n) => n.type === 'image')

                // only local files
                if (fs.existsSync(`${process.cwd()}/public${imageNode.url}`)) {
                    const dimensions = sizeOf(
                        `${process.cwd()}/public${imageNode.url}`
                    )

                    // Convert original node to next/image
                    ;(imageNode.type = 'mdxJsxFlowElement'),
                        (imageNode.name = 'Image'),
                        (imageNode.attributes = [
                            {
                                type: 'mdxJsxAttribute',
                                name: 'alt',
                                value: imageNode.alt,
                            },
                            {
                                type: 'mdxJsxAttribute',
                                name: 'src',
                                value: imageNode.url,
                            },
                            {
                                type: 'mdxJsxAttribute',
                                name: 'width',
                                value: dimensions.width,
                            },
                            {
                                type: 'mdxJsxAttribute',
                                name: 'height',
                                value: dimensions.height,
                            },
                        ])

                    // Change node type from p to div to avoid nesting error
                    node.type = 'div'
                    node.children = [imageNode]
                }
            }
        )
    }
}

export const remarkTocHeadings = (options) => {
    return (tree) =>
        visit(tree, 'heading', (node, _) => {
            const textContent = toString(node)
            options.exportRef.push({
                value: textContent,
                url: '#' + slug(textContent),
                depth: node.depth,
            })
        })
}
