'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import Button from '@components/Common/Button'
import Popup from '@components/Common/Popup'
import { DELETE, PUT } from '@libs/api'
import cn from '@libs/class'
import { formatDate } from '@libs/date'

const CheckInMessage = ({
	email,
	checkIn,
	reverse,
}: {
	email: string | null | undefined
	checkIn: CheckIn
	reverse: boolean
}) => {
	const [loading, setLoading] = useState(false)
	const [deletePopup, setDeletePopup] = useState(false)
	const [editPopup, setEditPopup] = useState(false)
	const [editContent, setEditContent] = useState(checkIn.content)

	const router = useRouter()

	const handleDelete = async () => {
		setLoading(true)
		const { id, ...rest }: CheckIn = checkIn
		await DELETE('/checkin', rest, true)
		setDeletePopup(false)
		setLoading(false)
		router.refresh()
	}
	const handleEdit = async () => {
		setLoading(true)
		const { id, ...rest }: CheckIn = checkIn
		await PUT('/checkin', { ...rest, content: editContent }, true)
		setEditPopup(false)
		setLoading(false)
		router.refresh()
	}

	const invalidEdit = editContent === checkIn.content || editContent === ''

	return (
		<div className="w-full text-center">
			{deletePopup && (
				<Popup close={() => setDeletePopup(false)}>
					<p className="text-center text-lg lg:text-xl">
						{`Are you sure you want to delete this message? :(`}
					</p>
					<Button
						variant="primary"
						onClick={handleDelete}
						onLoading={loading}
						onDisabled={loading}
					>
						Delete
					</Button>
				</Popup>
			)}
			<p className="mb-5 mt-10 font-heading text-5xl font-light">
				{checkIn.email === email ? 'You' : checkIn.name}
			</p>
			<div
				className={cn(
					'flex w-full place-items-center items-center',
					reverse && 'flex-row-reverse'
				)}
			>
				<div className="flex w-1/2 flex-col gap-3 font-decoration text-3xl text-zinc-400">
					<p>{formatDate(checkIn.createdAt)}</p>
					{checkIn.email === email && (
						<div className="mx-auto flex w-min gap-5">
							<Button
								variant={editPopup ? 'primary' : 'secondary'}
								size="base"
								onClick={editPopup ? handleEdit : () => setEditPopup(true)}
								onLoading={loading}
								onDisabled={editPopup && invalidEdit}
							>
								{editPopup ? 'Save' : 'Edit'}
							</Button>
							<Button
								variant="primary"
								size="base"
								onClick={() => setDeletePopup(true)}
							>
								Delete
							</Button>
						</div>
					)}
				</div>
				<div className="w-1/2 font-decoration text-2xl">
					<p className="translate-y-5 select-none text-6xl text-zinc-400">{`“`}</p>
					{editPopup ? (
						<textarea
							className="h-auto w-full border border-zinc-900 bg-zinc-100 p-2 text-2xl focus:outline-none"
							value={editContent}
							onChange={(e) => setEditContent(e.target.value)}
						/>
					) : (
						<p>{checkIn.content}</p>
					)}
				</div>
			</div>
		</div>
	)
}

export default CheckInMessage
