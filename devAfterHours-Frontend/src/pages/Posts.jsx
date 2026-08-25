import { useEffect, useState } from "react"
import Navbar from "../components/Home/Navbar"
import {getPosts} from '../services/postServices'
import PostCard from "../components/Postcard";

const Posts = () => {
    const[posts,setPosts] = useState([]);
    const[allPosts,setAllPosts] = useState([])
    const[error,setError] = useState('');
    const[isLoading,setIsLoading] = useState(true);
    const[search,setSearch] = useState("")
    const[searchMessage,setSearchMessage] = useState("")
    
    const submitHandler = async (e)=>{
        e.preventDefault();
        try{
            setIsLoading(true);
            setError("");
            setSearchMessage("")
            const response = await getPosts(search);
            const data = response.posts
            if(data.length===0){
                setSearchMessage(`No post found for "${search}"`)
                setPosts(allPosts)
            }else{
                setPosts(data);
            }
        }catch(error){
            console.error(`Error Searching : ${error}`);
            setError(error.response?.data?.message)
        }finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        const extractPosts = async()=>{
            try{
                const data = await getPosts();
                setPosts(data.posts)
                setAllPosts(data.posts)
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

                {/* Search Bar */}
                <form className="w-full" onSubmit={submitHandler}>
                    <input 
                    type="text" 
                    name="search" 
                    className="mb-5 outline-none rounded px-5 py-2 text-lg w-full border border-zinc-500 text-zinc-700"
                    placeholder="Search Posts" 
                    value={search}
                    onChange={(e)=>{
                        setSearch(e.target.value)
                    }}
                    />
                </form>
                
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
                    searchMessage &&
                    (
                        <p className="mb-5 text-zinc-500">
                            {searchMessage}
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
