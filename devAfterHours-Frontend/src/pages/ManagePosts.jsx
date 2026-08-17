import { useEffect, useState } from "react"
import Navbar from "../components/Home/Navbar"
import { getManagePosts } from "../services/postServices";
import { useAuth } from "../context/AuthContext";
import ManagePostCard from "../components/ManagePostCard";


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
    },[token])

    return (
        <div>
            <Navbar />
            <main className="py-10 px-20">
                <h1 className="text-4xl font-bold tracking-tight text-zinc-950">
                    My Posts
                </h1>

                <p className="mt-3 text-zinc-500 mb-5">
                    Manage your drafts, published posts, and archived posts.
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
                
                <section className="flex flex-wrap items-start gap-2 ">
                    {
                        !error && !isLoading && (
                            posts.map((post)=>{
                                return (<ManagePostCard 
                                    key={post._id}
                                    post={post}
                                />)
                            })
                        )
                    }
                </section>
            </main>
        </div>
    )
}

export default ManagePosts
