import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
  
    if (posts.length === 0) {
        return (
            <div className="w-full py-12 text-center">
                <Container>
                    <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">
                        <h1 className="text-3xl font-bold text-slate-900">
                            No posts yet
                        </h1>
                        <p className="mt-3 text-slate-600">
                            Log in to start reading and publishing your first articles.
                        </p>
                        <div className="mt-6">
                            <a href="/login" className="inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-white">
                                Go to login
                            </a>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-10'>
            <Container>
                <div className='flex flex-wrap gap-6'>
                    {posts.map((post) => (
                        <div key={post.$id} className='w-full md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
