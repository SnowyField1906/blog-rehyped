'use client'

import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

import Button from '@components/Common/Button'
import { POST } from '@libs/api'

const MessageInput = ({ session }: { session: Session | null }) => {
	const router = useRouter()
	const [message, setMessage] = useState('')
	const [loading, setLoading] = useState(false)

	const handleSubmit = async () => {
		setLoading(true)
		const date: string = new Date().toISOString()
		const checkIn: CheckIn = {
			email: session!.user!.email!,
			name: session!.user!.name!,
			content: message,
			createdAt: date,
			updatedAt: date,
		}
		await POST('/checkin', checkIn, true)
		setMessage('')
		setLoading(false)
		router.refresh()
	}

	return (
		<div className="w-full border border-zinc-900 font-decoration text-xl font-extralight text-zinc-700 lg:text-3xl">
			{session ? (
				<div className="flex flex-col p-5">
					<textarea
						placeholder="Type your message here..."
						className="h-full w-full items-center justify-center bg-zinc-100 p-2 text-lg focus:outline-none lg:text-2xl"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
					<Button
						variant="primary"
						size="lg"
						onClick={handleSubmit}
						onLoading={loading}
						onDisabled={loading || !message}
					>
						Submit
					</Button>
				</div>
			) : (
				<p className="flex w-full place-items-center justify-center gap-5 p-5">
					<span className="text-right">
						Sign in to make a mark on this site
					</span>
					<Button
						variant="primary"
						size="lg"
						arrow="right"
						className="mx-0"
						onClick={async () =>
							await signIn('google').then(() => router.refresh())
						}
					>
						Sign in
					</Button>
				</p>
			)}
		</div>
	)
}

export default MessageInput
