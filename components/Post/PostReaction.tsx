import React, { useCallback, useEffect } from 'react'

import siteMetadata from '@/data/siteMetadata.json'

const PostReaction = () => {
	const COMMENTS_ID = 'comments-container'

	const LoadComments = useCallback(() => {
		const script = document.createElement('script')
		script.src = 'https://giscus.app/client.js'
		script.setAttribute('data-repo', siteMetadata.reaction.repo)
		script.setAttribute('data-repo-id', siteMetadata.reaction.repositoryId)
		script.setAttribute('data-category', siteMetadata.reaction.category)
		script.setAttribute('data-category-id', siteMetadata.reaction.categoryId)
		script.setAttribute('data-mapping', siteMetadata.reaction.mapping)
		script.setAttribute(
			'data-reactions-enabled',
			siteMetadata.reaction.reactions
		)
		script.setAttribute('data-emit-metadata', siteMetadata.reaction.metadata)
		script.setAttribute(
			'data-input-position',
			siteMetadata.reaction.inputPosition
		)
		script.setAttribute('data-lang', siteMetadata.reaction.lang)
		script.setAttribute('data-theme', siteMetadata.reaction.theme)
		script.setAttribute('crossorigin', 'anonymous')
		script.async = true

		const comments = document.getElementById(COMMENTS_ID)
		if (comments) comments.appendChild(script)

		return () => {
			const comments = document.getElementById(COMMENTS_ID)
			if (comments) comments.innerHTML = ''
		}
	}, [])

	useEffect(() => {
		LoadComments()
	}, [LoadComments])

	return (
		<div className="w-full text-center text-gray-700 dark:text-gray-300">
			<div className="giscus w-full" id={COMMENTS_ID} />
		</div>
	)
}

export default PostReaction
