import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import { Container, PostCard, Button } from '../components'

function Home() {
    const [posts, setPosts] = useState([])
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        appwriteService.getPosts().then((result) => {
            setPosts(result?.documents ?? [])
        })
    }, [])

    if (posts.length === 0) {
        return (
            <div className="w-full py-12">
                <Container>
                    <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                        <h1 className="text-3xl font-bold text-slate-900">
                            {authStatus ? 'No posts published yet' : 'Welcome to Blog'}
                        </h1>
                        <p className="mt-3 text-slate-600">
                            {authStatus
                                ? "You're signed in, but there are no active posts to show right now."
                                : 'Sign in to publish posts and manage your own blog content.'}
                        </p>
                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                            {!authStatus ? (
                                <>
                                    <Link to="/login">
                                        <Button className="px-5">Login</Button>
                                    </Link>
                                    <Link to="/signup">
                                        <Button bgColor="bg-slate-200" textColor="text-slate-900" className="px-5">
                                            Sign Up
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                <Link to="/add-post">
                                    <Button className="px-5">Add Post</Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className="w-full py-10">
            <Container>
                <div className="flex flex-wrap gap-6">
                    {posts.map((post) => (
                        <div key={post.$id} className="w-full md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
