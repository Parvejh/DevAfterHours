const Post = require('../Models/Post')

// Create a new Post
module.exports.createPost = async (req,res)=>{
    try{
        console.log(req.body)
        const {
            title,
            slug,
            excerpt,
            content,
            coverImage,
            category,
            tags,
            status
        } = req.body;

        const post = await Post.findOne({slug});

        if(post){
            return res.status(409).json({
                success:false,
                message:"Post already exist.",
            })
        }

        const newPost = await Post.create({
            title,
            slug,
            excerpt,
            content,
            coverImage,
            author:req.user._id
        });

        return res.status(201).json({
            success:true,
            message:"Post created successfully!",
            data:{
                post:post
            }
        })
    }catch(error){
        console.error(`Error while Creating post : ${error}`)

        return res.status(500).json({
            success:false,
            message:"Internal Server error.",
        })
    }
}

// Gets all post
module.exports.getPosts = async (req,res)=>{
    try{
        const posts = await Post.find({
            status:'published'
        }).sort({
            publishedAt:-1
        });

        return res.status(200).json({
            success:true,
            message:"All Post retrieved successfully",
            posts:posts
        })

    }catch(error){
        console.error(`Internal Server Error : ${error}`);
        return res.status(500).json({
            success:false,
            message:"Failed to retrieve posts"
        })
    }
}

// Display the Post
module.exports.post = async (req,res)=>{
    try{
        const slug = req.params.slug;

        const post = await Post.findOne({
            slug,
            status:"published"
        });
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

        const updatedPost = await Post.findOneAndUpdate(
            {slug},
            {
                title,
                slug,
                excerpt,
                content,
                coverImage,
                category,
                tags,
                status
            },{
                new:true,
                runValidators:true
            }
        );

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
        const postId = req.params.id;

        const post = await Post.findById(postId);

        if(!post){
            return res.status(400).json({
                status:"error",
                message:"Post does not exist.",
            })
        }

        // Validate user deleting the post
        if(post.author.toString() !== req.user._id.toString()){
            return res.status(403).json({
                success:false,
                message:"You are not allowed to delete this post"
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

