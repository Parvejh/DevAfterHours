import {  useNavigate } from "react-router-dom"
import { deletePost } from "../services/postServices";
import {useAuth} from '../context/AuthContext'
import { useState } from "react";

const ManagePostCard = ({post,onDelete}) => {
    const navigate = useNavigate();
    const {token} = useAuth();
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState("");
    const [successmessage,setSuccessmessage] = useState("");

    const handleDelete = async ()=>{
        try{
            setIsLoading(true);
            setError("")
            setSuccessmessage("")
            const response = await deletePost(post._id,token);
            setSuccessmessage(response.message)
            onDelete(post._id);
        }catch(error){
            console.error(`Error in deleting Post`,error);
            setError(error.response?.data?.message);
        }finally{
            setIsLoading(false)
        }
    }
    return (
        <div className={`w-78 p-4 h-80 rounded flex flex-col gap-2 shadow-lg relative overflow-hidden`}>
            {/* Deleting Prompt */}
            <div className={`flex items-center justify-center absolute top-0 left-0 w-full h-full bg-white/90 ${!isLoading && 'hidden'}`}>
                <p className="text-red-500 font-semibold tracking-widest">Deleting Post..</p>
            </div>
            <header className="flex items-center justify-between gap-2 ">
                <h2 className="text-lg font-semibold">
                    {post.title}
                </h2>
                <p 
                className={`text-white px-1 text-sm rounded 
                    ${post.status==='draft'?"bg-gray-500":(post.status==='published'?"bg-green-500":"bg-orange-500")}
                `}>
                    {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                    {/* {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString()
                        : "Draft"
                    } */}
                </p>
            </header>
            <section className="body flex flex-col grow-1 justify-start">
                <p className="mb-2">
                    {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm">
                    <p>
                        Created At : {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                    <p>
                        Views : {post.views}
                    </p>
                </div>
            </section>
            <footer className="flex items-center justify-end gap-2">
                <button 
                onClick={()=>{navigate(`/dashboard/posts/edit/${post._id}`)}}
                className="rounded px-2 py-1 text-sm cursor-pointer active:scale-95 bg-green-500 text-white"
                >
                    Edit
                </button>
                <button
                onClick={handleDelete}
                className="rounded px-2 py-1 text-sm cursor-pointer active:scale-95 bg-red-500 text-white">
                    Delete
                </button>
            </footer>
        </div>
    )
}

export default ManagePostCard
