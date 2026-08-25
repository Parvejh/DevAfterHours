import { useParams } from "react-router-dom";
import Navbar from "../components/Home/Navbar";
import {getPostBySlug} from '../services/postServices';
import { useEffect,useState } from "react";

const Post = () => {
    const { slug } = useParams();
    const[post,setPost] = useState(null);
    const[isLoading,setIsLoading] = useState(true);
    const[error,setError] = useState("")

    useEffect(()=>{
        const generatePost = async()=>{
            try{
                const data = await getPostBySlug(slug);
                setPost(data.post)
            }catch(error){
                console.error(`Error fetching post: ${error}`)
                setError(
                    error.response?.data?.message ||
                    "Unable to load post."
                );
            }finally{
                setIsLoading(false);
            }
        }

        generatePost();
    },[slug])

    return (
        <div className="min-h-screen bg-zinc-50">
            <Navbar />

            <main className="mx-auto max-w-4xl px-6 py-16">
                {
                    isLoading && (
                        <p className="text-zinc-500">
                            Loading......
                        </p>
                    )
                }
                {error && (
                    <p className="text-red-500">
                        {error}
                    </p>
                )}
                {post && (
                    <article>

                        

                        {/* Article Header */}
                        <header >
                            <p className="text-sm font-medium uppercase tracking-wider text-zinc-500">
                                Development
                            </p>

                            <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl wrap-break-word">
                                {post.title}
                            </h1>

                            <p className="mt-5 text-lg leading-8 text-zinc-600 wrap-break-word">
                                {post.excerpt}
                            </p>

                            <div className="mt-6 flex items-center gap-4 text-sm text-zinc-500">
                                <span>
                                    {post.publishedAt &&
                                        new Date(post.publishedAt).toLocaleDateString()}
                                </span>

                                <span>•</span>

                                <span>
                                    {post.views} views
                                </span>
                            </div>
                        </header>

                        {/* Cover Image */}
                        {post.coverImage && (
                            <div className="my-5 overflow-hidden rounded-2xl">
                                <img
                                    src={post.coverImage}
                                    alt={post.title}
                                    className="h-auto max-h-[500px] w-full object-cover"
                                />
                            </div>
                        )}

                        {/* Divider */}
                        <div className="my-10 border-t border-zinc-200" />

                        {/* Article Content */}
                        {/* <div className="prose prose-zinc max-w-none">
                            {post.content}
                        </div> */}

                        {/* Article Content */}
                        <div
                            className="post-content"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                    </article>
                )}
            </main>
        </div>
    );
};

export default Post