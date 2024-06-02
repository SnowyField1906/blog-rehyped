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
		<html lang="en" className="scroll-smooth">
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
				<div className="h-full min-h-screen bg-zinc-100">
					<Header />
					{children}
					<Footer />
				</div>
			</body>
		</html>
	)
}

const DocumentHead = () => {
	return (
		<head>
			<link
				rel="icon"
				type="image/png"
				href="/static/favicons/android-chrome-192x192.png"
				sizes="192x192"
			/>
			<link
				rel="icon"
				type="image/png"
				href="/static/favicons/android-chrome-384x384.png"
				sizes="384x384"
			/>
			<link
				rel="apple-touch-icon"
				sizes="180x180"
				href="/static/favicons/apple-touch-icon.png"
			/>
			<meta
				name="msapplication-config"
				content="/static/favicons/browserconfig.xml"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="16x16"
				href="/static/favicons/favicon-16x16.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="32x32"
				href="/static/favicons/favicon-32x32.png"
			/>
			<link rel="icon" href="/static/favicons/favicon.ico" />
			<link
				rel="icon"
				type="image/png"
				href="/static/favicons/mstile-150x150.png"
				sizes="150x150"
			/>
			<link
				rel="mask-icon"
				href="/static/favicons/safari-pinned-tab.svg"
				color="#5bbad5"
			/>
			<link rel="manifest" href="/static/favicons/site.webmanifest" />

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
