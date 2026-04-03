import React from 'react'
import { Link } from 'react-router-dom'
import appwriteService from '../appwrite/config'

function PostCard({ post, title, featuredImage, $id, ...rest }) {
    const cardPost = post ?? { title, featuredImage, $id, ...rest }

    return (
        <Link to={`/post/${cardPost.$id}`}>
            <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-4 w-full overflow-hidden rounded-xl bg-slate-100">
                    <img
                        src={appwriteService.getFilePreview(cardPost.featuredImage)}
                        alt={cardPost.title}
                        className="h-48 w-full object-cover"
                    />
                </div>
                <h2 className="text-lg font-semibold text-slate-900">{cardPost.title}</h2>
            </div>
        </Link>
    )
}

export default PostCard
