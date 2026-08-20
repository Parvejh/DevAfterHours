import { useState } from "react"
import { editPost } from "../services/postServices"
import { useNavigate } from "react-router-dom"
import Posteditor from './Editor/Posteditor'

const EditPostForm = (props) => {
    const [title,setTitle] = useState(props.formData.title)
    const [slug,setSlug] = useState(props.formData.slug)
    const [excerpt,setExcerpt] = useState(props.formData.excerpt)
    const [coverImage,setCoverImage] = useState(props.formData.coverImage)
    const [content,setContent] = useState(props.formData.content)
    const [status, setStatus] = useState(props.formData.status);
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState("");
    const [successmessage,setSuccessmessage] = useState('')
    const {postId} = props;
    const navigate = useNavigate();


    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            setIsLoading(true)
            setError("")
            setSuccessmessage("")
            const updatedPostData = {title,slug,status,excerpt,content,coverImage};
            await editPost(postId,updatedPostData);
            setSuccessmessage("Post Updated Successfully. Redirecting to Dashboard..")
            setTimeout(()=>{
                navigate('/dashboard/posts')
            },2000)
        }catch(error){
            console.error(`Error in editing post : ${error}`);
            setError(error.response?.data?.message);
        }finally{
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-fit bg-zinc-50">
            <main className="mx-auto max-w-4xl px-6 py-3">
                <h1 className="text-3xl font-bold tracking-tight text-zinc-950 ">
                    Edit Post
                    <span className="text-sm text-zinc-500 ml-5 font-medium">
                        Edit/Update the Post.
                    </span>
                </h1>

                
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
                {
                    isLoading &&
                    <p className="mt-2 text-green-500">
                        Loadingg...
                    </p>
                }
                <form 
                onSubmit={handleSubmit}
                className="mt-5 flex flex-col gap-5 w-full"
                >
                    <div className="flex gap-5 w-full">
                        <div className="left w-1/2 flex flex-col gap-3">
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
                                onChange={(e)=>{setTitle(e.target.value)}}
                                />
                            </div>
                            {/* Slug Input */}
                            <div className="flex flex-col justify-center items-start gap-2 w-full">
                                <h3 className="text-xl text-zinc-900">Slug</h3>
                                <input 
                                className="outline-none bg-zinc-100 shadow p-2 rounded w-full"
                                value={slug}
                                type="text" 
                                name="slug" 
                                id="slugInput" 
                                placeholder="Slug for the post"
                                onChange={(e)=>{setSlug(e.target.value)}}
                                />
                            </div>
                            {/* Excerpt Input */}
                            <div className="flex flex-col justify-center items-start gap-2 w-full">
                                <h3 className="text-xl text-zinc-900">Excerpt</h3>
                                <textarea 
                                className="outline-none bg-zinc-100 shadow p-2 rounded w-full"
                                rows={4}
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
                        </div>

                        {/* Content Input */}
                        <div className="right w-1/2 flex flex-col justify-start ">
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
                            disabled = {isLoading?true:false}
                        >
                            {isLoading?'Updating post':'Update Post'}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    )
}

export default EditPostForm
