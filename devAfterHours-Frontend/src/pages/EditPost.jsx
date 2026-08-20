import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getPostForEdit } from "../services/postServices";
import EditPostForm from "../components/EditPostForm";
import Navbar from "../components/Home/Navbar";

const EditPost = () => {
    const {id} = useParams();

    const[error,setError] = useState("")
    const[isLoading,setIsLoading]= useState(true);
    const[postData,setPostData] = useState({})

    // get the post details from the id
    useEffect(()=>{
        const fetchPost = async()=>{
            try{
                setError('')
                const postForEdit = await getPostForEdit(id);
                setPostData(postForEdit.post);
            }catch(error){
                console.error(`Error in fetching post to edit: ${error}`);
                setError(error.response?.data?.message)
            }finally{
                setIsLoading(false);
            }
        }

        fetchPost();
    },[]) 

    return (
        <div>
            <Navbar />
            {
                error&& (
                    <p>
                        {error}
                    </p>
                )
            }
            {
                isLoading && (
                    <p>
                        Loading..
                    </p>
                )
            }
            {
                !error && !isLoading && (
                    <EditPostForm formData={postData} key={postData._id} postId={postData._id} />
                )
            }
        </div>
    )
}

export default EditPost
