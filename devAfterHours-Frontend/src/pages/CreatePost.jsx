import { useEffect, useState } from "react";
import Navbar from "../components/Home/Navbar";
import { createPost } from "../services/postServices";
import Posteditor from "../components/Editor/Posteditor";
import { getCategories } from "../services/categoryServices";

const CreatePost = () => {

    const [title,setTitle] = useState("")
    const [slug,setSlug] = useState("")
    const [excerpt,setExcerpt] = useState("")
    const [coverImage,setCoverImage] = useState("")
    const [content,setContent] = useState("")
    const [status, setStatus] = useState("draft");
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState("");
    const [successmessage,setSuccessmessage] = useState('')
    const [isSlugEdited, setIsSlugEdited] = useState(false);
    
    const handleSubmit= async (event)=>{
        event.preventDefault();
        setIsLoading(true)
        setError("")
        setSuccessmessage("")
        try{
            // console.log("CONTENT:", content);
            // create the post
            const createdPost = await createPost(
                {
                    title,
                    slug,
                    excerpt,
                    coverImage,
                    content,
                    status,
                    category
                }
            )
            // Set Category 
            setCategory("")
            // set success message
            setSuccessmessage("Post created successfully!")
            // clear the form fields
            resetForm();
            // set timer for success meesgae
            setTimeout(()=>{
                setSuccessmessage("")
            },2000)
        }catch(error){
            console.error(`Error in creating post: ${error}`);
            setError(error.response?.data?.message);
            // set timer for success meesgae
            setTimeout(()=>{
                setError("")
            },2000)
        }finally{
            setIsLoading(false)
        }

    }

    const resetForm = ()=>{
        setTitle("")
        setSlug("")
        setExcerpt("")
        setContent("")
        setCoverImage("")
        setStatus("draft")
    }

    const generateSlug = (text) => {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");
    };

    useEffect(()=>{
        const fetchCategories = async()=>{
            try{
                setError("")
                setIsLoading(true)
                const data = await getCategories();
                console.log(data.categories)
                setCategories(data.categories) 
            }catch(error){
                console.error(`Error in fetching categories: ${error}`)
                setError(error.response?.data?.message)
            }finally{
                setIsLoading(false)
            }
        }

        fetchCategories();
    },[])

    return (
        <div className="min-h-screen bg-zinc-50">
            <Navbar />

            <main className="mx-auto max-w-4xl px-6 py-6">
                <h1 className="text-3xl font-bold tracking-tight text-zinc-950">
                    Create Post
                </h1>

                <p className="mt-2 text-zinc-500">
                    Write and publish a new article.
                </p>
                {
                    error &&
                    <p className="mt-2 text-red-500">
                        {error}
                    </p>
                }
                {
                    successmessage &&
                    <p className="mt-2 text-green-500">
                        {successmessage}
                    </p>
                }
                
                <form 
                onSubmit={handleSubmit}
                className="mt-5 flex flex-col gap-5 w-full"
                >
                        <div className="left w-full flex flex-col gap-3">
                            {/* Title Input */}
                            <div className="flex flex-col justify-center items-start gap-2 w-full">
                                <h3 className="text-xl text-zinc-800">Title</h3>
                                <input
                                className="outline-none bg-zinc-100 shadow p-2 rounded w-full" 
                                value={title}
                                type="text" 
                                name="title" 
                                id="titleInput" 
                                placeholder="Title of the post"
                                onChange={(e)=>{
                                    const value = e.target.value
                                    setTitle(value)
                                    if(!isSlugEdited){
                                        setSlug(generateSlug(value))
                                    }
                                    }
                                }
                                />
                            </div>
                            {/* Slug Input */}
                            <div className="flex flex-col justify-center items-start gap-2 w-full">
                                <h3 className="text-xl text-zinc-900">Slug</h3>
                                {!isSlugEdited && (
                                    <span className="text-xs text-zinc-400">
                                        Auto-generated
                                    </span>
                                )}
                                <input 
                                className="outline-none bg-zinc-100 shadow p-2 rounded w-full"
                                value={slug}
                                type="text" 
                                name="slug" 
                                id="slugInput" 
                                placeholder="Slug for the post"
                                onChange={(e)=>{
                                    setIsSlugEdited(true)
                                    setSlug(generateSlug(e.target.value))
                                    }
                                }
                                />
                            </div>
                            {/* Excerpt Input */}
                            <div className="flex flex-col justify-center items-start gap-2 w-full">
                                <h3 className="text-xl text-zinc-900">Excerpt</h3>
                                <textarea 
                                className="resize-none outline-none bg-zinc-100 shadow p-2 rounded w-full"
                                rows={3}
                                value={excerpt}
                                type="text" 
                                name="excerpt" 
                                id="excerptInput" 
                                placeholder="Write a short summary of your post"
                                onChange={(e)=>{setExcerpt(e.target.value)}}
                                />
                            </div>
                            {/* Cover Image Input */}
                            <div className="flex flex-col justify-center items-start gap-2 w-full">
                                <h3 className="text-xl text-zinc-900">Cover Image</h3>
                                <input 
                                className="outline-none bg-zinc-100 shadow p-2 rounded w-full"
                                value={coverImage}
                                type="text" 
                                name="coverImage" 
                                id="coverImageInput" 
                                placeholder="Image url://"
                                onChange={(e)=>{setCoverImage(e.target.value)}}
                                />
                            </div>
                            <div className="flex items-center justify-between gap-5">
                                {/* Status Input */}
                                <div className="flex flex-col justify-center items-start gap-2 w-full">
                                    <h3 className="text-xl text-zinc-900">Status</h3>
                                    <select 
                                    className="outline-none bg-zinc-100 shadow p-2 rounded w-full"
                                    name="status" 
                                    id="statusInput"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                        <option value="archived">Archived</option>
                                    </select>
                                </div>
                                {/* Category Input */}
                                <div className="flex flex-col justify-center items-start gap-2 w-full">
                                    <h3 className="text-xl text-zinc-900">Category</h3>
                                    <select 
                                    className="outline-none bg-zinc-100 shadow p-2 rounded w-full"
                                    name="category" 
                                    id="categoryInput"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    >
                                        {categories.map((category)=>{
                                            return <option key={category._id} value={`${category.slug}`}>
                                                {category.name}
                                            </option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            {/* Content Input */}
                            <div className="right w-full flex flex-col justify-start ">
                                {/* Content Input */}
                                <div className="flex flex-col justify-center items-start gap-2 w-full">
                                    <h3 className="text-xl text-zinc-900">Content</h3>
                                    <Posteditor
                                        content={content}
                                        onChange={setContent}
                                    />
                                    {/* <textarea 
                                    className="outline-none bg-zinc-100 shadow p-2 rounded w-full"
                                    rows={18}
                                    value={content}
                                    type="text" 
                                    name="content" 
                                    id="econtentInput" 
                                    placeholder="Content of the post"
                                    onChange={(e)=>{setContent(e.target.value)}}
                                    /> */}
                                </div>
                            </div>
                        </div>
                    <div>
                        <button
                            type="submit"
                            className="rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 "
                            disabled={isLoading}
                        >
                            {isLoading?'Creating post':'Create Post'}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};
export default CreatePost
