'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import Button from '@components/Common/Button'
import Popup from '@components/Common/Popup'
import { DELETE, PUT } from '@libs/api'
import cn from '@libs/class'
import { formatDate, formatDateTime } from '@libs/date'

const VisitorMessage = ({
	email,
	visitor,
	reverse,
}: {
	email: string | null | undefined
	visitor: Visitor
	reverse: boolean
}) => {
	const [loading, setLoading] = useState(false)
	const [deletePopup, setDeletePopup] = useState(false)
	const [editPopup, setEditPopup] = useState(false)
	const [editContent, setEditContent] = useState(visitor.content)

	const router = useRouter()

	const handleDelete = async () => {
		setLoading(true)
		await DELETE('/visitor', visitor, true)
		setDeletePopup(false)
		setLoading(false)
		router.refresh()
	}
	const handleEdit = async () => {
		setLoading(true)
		await PUT('/visitor', { ...visitor, content: editContent }, true)
		setEditPopup(false)
		setLoading(false)
		router.refresh()
	}

	const invalidEdit = editContent === visitor.content || editContent === ''

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
			<p className="mt-2 font-heading text-3xl font-light lg:mb-5 lg:mt-10 lg:text-4xl xl:text-5xl">
				{visitor.email === email ? 'You' : visitor.name}
			</p>
			<div
				className={cn(
					'flex w-full flex-col place-items-center items-center lg:flex-row',
					reverse && 'lg:flex-row-reverse'
				)}
			>
				<div className="flex w-full flex-col gap-1 font-display text-base text-zinc-500 lg:w-1/2 lg:gap-3 lg:text-lg xl:text-xl">
					<p>{formatDateTime(visitor.createdAt)}</p>
					{visitor.email === email && (
						<div className="mx-auto flex w-min gap-2 lg:gap-5">
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
				<div className="w-full font-display text-base lg:w-1/2 lg:text-lg xl:text-xl">
					<p className="select-none text-5xl text-zinc-400">{`“`}</p>
					{editPopup ? (
						<textarea
							className="h-auto w-full -translate-y-5 border border-zinc-900 bg-zinc-100 p-2 text-xl focus:outline-none"
							value={editContent}
							onChange={(e) => setEditContent(e.target.value)}
						/>
					) : (
						<p className="-translate-y-5 ">{visitor.content}</p>
					)}
				</div>
			</div>
		</div>
	)
}

export default VisitorMessage
