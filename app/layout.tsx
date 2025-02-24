import NextTopLoader from 'nextjs-toploader'

import Analytics from '@components/Page/Analytics'
import Footer from '@components/Page/Footer'
import Header from '@components/Page/Header'

import '@styles/tailwind.css'
import '@styles/extra.css'
import '@styles/prism.css'

const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode
}>) => {
	return (
		<html lang="en" className="scroll-smooth bg-zinc-50">
			<DocumentHead />
			<body>
				<NextTopLoader
					color="#1f1f1f"
					initialPosition={0.08}
					crawlSpeed={200}
					height={3}
					crawl={true}
					showSpinner={true}
					easing="ease"
					speed={200}
					shadow="0 0 10px #2299DD,0 0 5px #2299DD"
				/>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<Analytics />
				<main className="flex h-full min-h-screen w-full flex-col gap-10 lg:gap-14 xl:gap-20">
					<Header />
					<div className="mx-auto flex w-11/12 flex-col gap-10 lg:w-3/4 lg:gap-14 xl:gap-20">
						{children}
					</div>
					<Footer />
				</main>
			</body>
		</html>
	)
}

const DocumentHead = () => {
	return (
		<head>
			<link
				rel="apple-touch-icon"
				sizes="180x180"
				href="/apple-touch-icon.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="32x32"
				href="/favicon-32x32.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="16x16"
				href="/favicon-16x16.png"
			/>
			<link rel="manifest" href="/site.webmanifest" />
			<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#3b3b3b" />
			<meta name="msapplication-TileColor" content="#2d89ef" />
			<meta name="theme-color" content="#ffffff" />

			<meta name="msapplication-TileColor" content="#603cba" />

			<meta
				name="theme-color"
				media="(prefers-color-scheme: light)"
				content="#fff"
			/>
			<link rel="icon" href="/static/logo.png" sizes="any" type="image/png" />
			<link
				rel="stylesheet"
				href="https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css"
				integrity="sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc"
				crossOrigin="anonymous"
			/>
		</head>
	)
}

export default RootLayout
