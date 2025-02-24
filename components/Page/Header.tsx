'use client'

import { Menu, Transition } from '@headlessui/react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'
import { getSession, signIn, signOut } from 'next-auth/react'
import React, { Fragment, useEffect, useState } from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { RxHamburgerMenu } from 'react-icons/rx'

import siteMetadata from '@/data/siteMetadata.json'
import Button from '@components/Common/Button'
import Image from '@components/Common/Image'
import cn from '@libs/class'

const Header = () => {
	const router = useRouter()
	const [session, setSession] = useState<Session | null>()
	const [isOpen, setIsOpen] = useState(false)
	const [mount, setMount] = useState(false)

	useEffect(() => {
		setMount(true)
		;(async () => {
			const session = await getSession()
			setSession(session)
		})()
	}, [])

	return (
		<header className="z-50 grid w-full select-none p-8 tracking-wide text-zinc-900 lg:px-20">
			<div className="flex justify-between">
				<Link
					href="/"
					className="my-auto h-min font-heading text-xl lg:text-3xl"
				>
					{siteMetadata.title}
				</Link>
				<Menu as="div" className="block lg:hidden">
					<Menu.Button className="ml-2 cursor-pointer rounded-full bg-zinc-300 ring-zinc-400 transition-all hover:ring-1">
						{mount && (
							<motion.button
								className="flex h-8 w-8 items-center justify-center p-2"
								whileTap={{
									scale: 0.5,
								}}
								transition={{ duration: 0.1, ease: 'easeIn' }}
								aria-label="Toggle List Menu"
								type="button"
							>
								{isOpen ? (
									<RxHamburgerMenu className="h-4 w-4" />
								) : (
									<RxHamburgerMenu className="h-4 w-4" />
								)}
							</motion.button>
						)}
					</Menu.Button>

					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
						afterEnter={() => {
							setIsOpen(!isOpen)
						}}
						afterLeave={() => {
							setIsOpen(!isOpen)
						}}
					>
						<Menu.Items className="absolute right-0 mx-5 mt-2 w-48 origin-top-right divide-y divide-zinc-300 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
							<div className="py-1">
								{siteMetadata.internalLinks
									.filter((link) => link.path !== '/publish')
									.map((link) => (
										<Menu.Item key={link.title}>
											{({ active }) => (
												<Link
													href={link.path}
													className={cn(
														active
															? 'bg-gray-200 text-gray-700'
															: 'bg-white text-zinc-700 hover:bg-gray-300',
														'block px-4 py-2 text-sm'
													)}
												>
													<div className="flex flex-row">{link.title}</div>
												</Link>
											)}
										</Menu.Item>
									))}
								<hr className="my-1 border-gray-200" />
								<Menu.Item>
									{({ active }) => (
										<>
											<a
												className={cn(
													active
														? 'cursor-pointer bg-gray-200 text-gray-700'
														: 'bg-white text-zinc-700 hover:bg-gray-300',
													'block cursor-pointer px-4 py-2 text-sm'
												)}
											>
												<div className="flex w-full flex-row">
													{session ? (
														<>
															<div className="mr-2 flex w-8 flex-row items-center">
																{session?.user?.image ? (
																	<img
																		className="h-6 w-6 cursor-pointer rounded-full"
																		src={session?.user.image}
																		alt="User Profile Icon"
																	/>
																) : (
																	''
																)}
															</div>
															<div
																className="w-full text-left"
																onClick={() =>
																	signOut({
																		redirect: true,
																		callbackUrl: window.location.href,
																	})
																}
															>
																Sign out
															</div>
														</>
													) : (
														<div
															className="w-full text-left"
															onClick={() =>
																signIn('google', {
																	callbackUrl: window.location.href,
																	redirect: true,
																})
															}
														>
															Sign in
														</div>
													)}
												</div>
											</a>
										</>
									)}
								</Menu.Item>
							</div>
						</Menu.Items>
					</Transition>
				</Menu>
				<div className="hidden items-center gap-10 text-base font-light leading-5 text-zinc-500 lg:flex">
					{siteMetadata.internalLinks
						.filter((link) => link.path !== '/publish')
						.map((link) => (
							<Link
								key={link.title}
								href={link.path}
								className="simple-link hover:text-black"
							>
								{link.title}
							</Link>
						))}
					{session ? (
						<div className="flex items-center gap-2 rounded-full p-1 text-black ring-1 ring-zinc-500 ">
							<Image
								alt="User avatar"
								src={session?.user?.image || ''}
								width={30}
								height={30}
								className="mx-auto ml-2 rounded-full"
							/>
							<p className="px-2 py-2">{session?.user?.name}</p>
							<button
								onClick={() =>
									signOut({
										redirect: true,
										callbackUrl: window.location.href,
									})
								}
								className="rounded-full text-zinc-500 transition-all duration-200 ease-in-out hover:text-black"
							>
								<AiOutlineLogout className="mr-2 h-6 w-6" />
							</button>
						</div>
					) : (
						<Button
							variant="secondary"
							arrow="right"
							size="base"
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
				</div>
			</div>
		</header>
	)
}

export default Header
