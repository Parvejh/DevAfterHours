import { useEffect, useState } from "react"
import Navbar from "../components/Home/Navbar"
import {getPosts} from '../services/postServices'
import PostCard from "../components/Postcard";

const Posts = () => {
    const[posts,setPosts] = useState([]);
    const[error,setError] = useState('');
    const[isLoading,setIsLoading] = useState(true);
    
    useEffect(()=>{
        const extractPosts = async()=>{
            try{
                const data = await getPosts();
                setPosts(data.posts)
            }catch(error){
                console.error("Error fetching posts:", error);
                setError(error.response?.data?.message || "Unable to load posts.")
            }finally{
                setIsLoading(false)
            }
        }

        extractPosts();
    },[])


    return (
        <div className="min-h-screen bg-zinc-50">
            <Navbar />

            <main className="mx-auto max-w-7xl px-6 py-16">
                <h1 className="text-4xl font-bold tracking-tight text-zinc-950">
                    All Posts
                </h1>

                <p className="mt-3 text-zinc-500 mb-5">
                    Explore everything I've written.
                </p>

                {
                    isLoading &&
                    (
                        <p className="mt-10 text-zinc-500">
                            Loading posts...
                        </p>
                    )
                }

                {
                    error &&
                    (
                        <p className="mt-10 text-red-500">
                            {error}
                        </p>
                    )
                }

                {
                    !isLoading && !error && posts.length===0 && (
                        <p className="mt-10 text-zinc-500">
                            No Posts published yet.
                        </p>
                    )
                }

                {
                    !isLoading && !error && posts.length>0 && (
                        posts.map((post)=>(
                            <PostCard
                                key={post._id}
                                post={post}
                            />
                        ))
                    )
                }
            </main>
        </div>
    )
}

export default Posts
