import { Metadata } from 'next'
import React from 'react'

import Title from '@components/Common/Title'
import ProfileSpecific from '@components/Utils/ProfileSpecific'
import siteMetadata from '@data/siteMetadata.json'

const metadata = siteMetadata.internalLinks.find(
	(link) => link.title === 'Profile'
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

const Profile = async () => {
	return (
		<>
			<Title primary={metadata!.title} secondary={metadata!.description} />
			<div className="grid w-full grid-cols-2">
				<div className="flex flex-col gap-28">
					<ProfileSpecific title="Present" className="ml-auto">
						<p>{`I have been trying to shift my field from Blockchain to Machine Learning as a backup plan. I'm following a lot of cool repositories on Github but I still don't have time to try them out.`}</p>
						<p>{`I'm currently pursuing my favorite major at my dream university, but I've been enduring a lot of pain and frustration with it due to various reasons. I wish to leave it as soon as possible and my goal is to apply to a remote university abroad in the near future.`}</p>
						<p>{`I want to dedicate as much time as possible to learning English, but after a while, I still find myself tangled up with many aspects and having to postpone it.`}</p>
					</ProfileSpecific>
					<ProfileSpecific title="Music" className="mr-auto">
						<p>{`I have a special affection for Rap, Hip-hop, and R&B music. However, I exclusively listen to Vietnamese songs because my ears are not accustomed to foreign languages, and I enjoy getting immersed in the lyrics of a song passively rather than the melody.`}</p>
						<p>{`My favourite rapper is B Ray, he has a profound personal significance to me. His music has accompanied me through various stages of my life, and his lyrics resonate deeply with my experiences.`}</p>
						<p>{`Lately, I've been looping Hustlang Robber songs quite a bit. However, if I could recommend some rappers to you, they would be MCK, Wxrdie, and Binz.`}</p>
					</ProfileSpecific>
				</div>
				<div className="flex flex-col gap-28">
					<ProfileSpecific title="Preferences" className="ml-auto mt-28">
						<p>{`I have a deep passion for knowledge and research, particularly in Mathematics, Science, and Spirituality also. I'm drawn to abstract and enigmatic concepts that challenge understanding. My choices consistently lean towards the atypical and out of the ordinary. Sometimes I hate this.`}</p>
						<p>{`My preferred destinations are Japan, Taiwan, and especially Nordic countries. But there is no place I love more than Vietnam, my born-and-raised home.`}</p>
						<p>{`I have a fondness for purple, all shades of purple. Additionally, I also like blue, white, and black.`}</p>
					</ProfileSpecific>
					<ProfileSpecific title="Movie" className="mr-auto">
						<p>{`I have a special love on Anime, but I don't have much time to watch.`}</p>
						<p>{`My go-to genres are Supernatural, Drama, and Romance. An Anime movie blending all three is a magnum opus to me. A romantic love, gripping with drama's touch, and spiced up with supernatural plot twists. Absolutely astounding, isn't it?`}</p>
						<p>{`Besides Anime, I also enjoy indulging in J-dramas, Documentaries, and Science films. However, I specifically prefer movies over series due to my lack of patience.`}</p>
					</ProfileSpecific>
				</div>
				<div className="col-span-2 flex flex-col gap-28">
					<ProfileSpecific title="Personality" className="mx-auto mt-28">
						<p>{`While I'm not strictly a Jungian, I find that delving into MBTI occasionally helps unearth some of my traits that I have never realized. Describing myself is challenging, so I borrow those ides to do aid in self-expression.`}</p>
						<p>{`It's fortunate that mine is exactly INFJ type. Nevertheless, it's prone to lead me entering the negative Ni-Ti Loop, which makes me incredibly draining.`}</p>
						<p>{`By the way, my Enneagram is 4 with wing 5, instinctual variant so/sp and tritype 461.`}</p>
					</ProfileSpecific>
				</div>
			</div>
		</>
	)
}

export default Profile
