import {  useNavigate } from "react-router-dom"

const ManagePostCard = ({post}) => {
    const navigate = useNavigate();
    return (
        <div className={`w-78 p-4 h-80 rounded flex flex-col gap-2 shadow-lg`}>
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
                <button className="rounded px-2 py-1 text-sm cursor-pointer active:scale-95 bg-red-500 text-white">
                    Delete
                </button>
            </footer>
        </div>
    )
}

export default ManagePostCard
