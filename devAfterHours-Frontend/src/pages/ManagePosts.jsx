import { useEffect, useState } from "react"
import Navbar from "../components/Home/Navbar"
import { getManagePosts } from "../services/postServices";
import PostCard from "../components/Postcard";
import { useAuth } from "../context/AuthContext";


const ManagePosts = () => {
    const [posts,setPosts] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState('');
    const {token} = useAuth()

    useEffect(()=>{
        const extractPosts = async()=>{
            try{
                const data = await getManagePosts(token);
                setPosts(data.posts)
            }catch(error){
                console.error(`Error in fetching admin Posts : ${error}`);
                setError(error.response?.data?.message || "Unable to load Posts");
            }finally{
                setIsLoading(false)
            }
        }
        extractPosts();
    },[])

    return (
        <div>
            <Navbar />
            <main>
                <h1 className="text-4xl font-bold tracking-tight text-zinc-950">
                    All Posts
                </h1>

                <p className="mt-3 text-zinc-500 mb-5">
                    Explore everything I've written.
                </p>

                {
                    error && (
                        <p className="text-red-500 mt-3">
                            {error}
                        </p>
                    )
                }
                {
                    isLoading && (
                        <p className="text-zinc-500 mt-3">
                            Loading..
                        </p>
                    )
                }

                {
                    !error && !isLoading && (
                        posts.map((post)=>{
                            return <PostCard 
                                key={post._id}
                                post={post}
                            />
                        })
                    )
                }
            </main>
        </div>
    )
}

export default ManagePosts
