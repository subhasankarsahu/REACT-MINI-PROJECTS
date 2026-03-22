import React, { useEffect, useState } from 'react'

function Github() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const controller = new AbortController()

        async function getGithubData() {
            try {
                const response = await fetch('https://api.github.com/users/subhasankarsahu', {
                    signal: controller.signal,
                })

                if (!response.ok) {
                    throw new Error(`GitHub request failed with status ${response.status}`)
                }

                const data = await response.json()
                setData(data)
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message)
                }
            } finally {
                setLoading(false)
            }
        }

        getGithubData()

        return () => controller.abort()
    }, [])

    if (loading) {
        return <div className='text-center m-4 bg-gray-600 text-white p-4 text-3xl'>Loading GitHub data...</div>
    }

    if (error) {
        return <div className='text-center m-4 bg-red-600 text-white p-4 text-2xl'>{error}</div>
    }

    return (
        <div className='m-4 rounded-2xl bg-gray-600 p-6 text-white shadow-lg'>
            <div className='flex flex-col items-center gap-4 sm:flex-row sm:items-center'>
                <img
                    src={data?.avatar_url}
                    alt={data?.login ? `${data.login}'s avatar` : 'GitHub avatar'}
                    className='h-24 w-24 rounded-full border-4 border-white object-cover'
                />
                <div className='text-center sm:text-left'>
                    <h2 className='text-3xl font-bold'>{data?.name ?? data?.login ?? 'GitHub User'}</h2>
                    <p className='text-lg text-gray-200'>GitHub Followers: {data?.followers ?? 'N/A'}</p>
                </div>
            </div>
        </div>
    )
}

export default Github
