'use client'

import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'
import { signIn } from 'next-auth/react'

import Button from '@components/Common/Button'

const SignInRequirement = ({
	session,
	navigate,
}: {
	session: Session | null
	navigate?: { href: string; text: string }
}) => {
	const router = useRouter()

	return (
		<>
			{session ? (
				navigate && (
					<Button
						variant="primary"
						size="lg"
						href={navigate.href}
						arrow="right"
					>
						{navigate.text}
					</Button>
				)
			) : (
				<Button
					variant="primary"
					size="lg"
					arrow="right"
					onClick={() =>
						signIn('google', {
							callbackUrl: window.location.href,
							redirect: true,
						})
					}
				>
					Sign in
				</Button>
			)}
		</>
	)
}

export default SignInRequirement
