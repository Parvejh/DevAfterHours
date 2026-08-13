const Post = require('../Models/Post')

// Create a new Post
module.exports.createPost = async (req,res)=>{
    try{
        console.log(req.body)
        const {title,slug,excerpt,content,coverImage} = req.body;

        const post = await Post.findOne({slug});

        if(post){
            return res.status(400).json({
                success:false,
                message:"Post already exist.",
            })
        }

        const newPost = await Post.create(req.body);
        return res.status(201).json({
            success:true,
            message:"Post created successfully!",
            newPost
        })
    }catch(e){
        console.log(`Error while Creating post : ${e}`)
        return res.status(500).json({
            success:false,
            message:"Post not created.",
            error:e
        })
    }
}

// Display the Post
module.exports.post = async (req,res)=>{
    try{
        const slug = req.params.slug;

        const post = await Post.findOne({slug});
        if(!post){
            return res.status(400).json({
                success:false,
                message:"Post does not exist.",
            })
        }

        return res.status(200).json({
            success:true,
            message:"Post retrieved successfully",
            post
        })
    }catch(e){
        console.log(`Error while Getting post : ${e}`)
        return res.status(500).json({
            success:false,
            message:"Opening Post Failed.",
            error:e
        })
    }
}

// Update the post
module.exports.updatePost  = async (req,res)=>{
    try{
        const slug = req.params.slug;

        const post = await Post.findOne({slug});

        if(!post){
            return res.status(404).json({
                success:false,
                message:"Post not found.",
            })
        }

        const updatedPost = await Post.findOneAndUpdate({slug},req.body);
        return res.status(200).json({
            success:true,
            message:"Post Updated successfully",
            originalPost:post,
            updatedPost:updatedPost
        })
    }catch(e){
        console.log(`Error while Updating post : ${e}`)
        return res.status(500).json({
            success:false,
            message:"Updating Post Failed.",
            error:e
        })
    }
}

// Delete a post
module.exports.deletePost  = async (req,res)=>{
    try{
        const id = req.params.id;

        const post = await Post.findById(id);

        if(!post){
            return res.status(400).json({
                status:"error",
                message:"Post does not exist.",
            })
        }

        const deletedPost = await Post.findByIdAndDelete(id);
        return res.status(200).json({
            status:"success",
            message:"Post Deleted successfully",
            deletedPost:deletedPost
        })
    }catch(e){
        console.log(`Error while Deleting post : ${e}`)
        return res.status(500).json({
            status:"error",
            message:"Deleting Post Failed.",
            error:e
        })
    }
}

