import { Metadata } from 'next'
import { Session } from 'next-auth'

import Heading from '@components/Common/Heading'
import SignInRequirement from '@components/Utils/SignInRequirement'
import siteMetadata from '@data/siteMetadata.json'
import { auth } from '@libs/auth'

const metadata = siteMetadata.internalLinks.find(
	(link) => link.title === 'Home'
)

export const generateMetadata = (): Metadata => {
	return {
		metadataBase: new URL(siteMetadata.siteUrl),
		title: metadata!.title + ' | ' + siteMetadata.headerTitle,
		description: metadata!.description,
		openGraph: {
			images: [siteMetadata.siteUrl + siteMetadata.siteBanner],
		},
	}
}

const Home = async () => {
	const session: Session | null = await auth()

	return (
		<main className="m-auto flex h-full w-11/12 flex-col place-items-center items-center py-16 lg:w-3/4">
			<Heading heading={metadata!.description} />
			<p className="py-6 text-center font-decoration text-xl font-extralight text-zinc-700 lg:py-8 lg:text-2xl">
				Start discovering the creative world by clicking the button below
			</p>
			<SignInRequirement
				session={session}
				navigate={{ href: '/posts', text: 'View posts' }}
			/>
		</main>
	)
}

export default Home
