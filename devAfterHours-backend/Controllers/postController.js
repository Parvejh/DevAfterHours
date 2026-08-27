const Post = require('../Models/Post')
const Category = require('../Models/Category')

// Create a new Post
module.exports.createPost = async (req,res)=>{
    try{
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

        // Check if the new post is published
        if(status==='published')
            publishedAt = new Date();
        else 
            publishedAt = null;

        const fetchedCategory = await Category.findOne({slug:category.toLowerCase()})

        if (!fetchedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found."
            });
        }

        const newPost = await Post.create({
            title,
            slug,
            excerpt,
            content,
            coverImage,
            status,
            category:fetchedCategory._id,
            author:req.user._id,
            publishedAt
        });


        return res.status(201).json({
            success:true,
            message:"Post created successfully!",
            data:{
                post:newPost
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

// Gets all public post
module.exports.getPosts = async (req,res)=>{
    try{
        const search = req.query.search
        const requestedPage = Number(req.query.page) || 1
        const currentPage = Math.max(1,requestedPage)
        const limit = 5
        const skip = (currentPage-1)*limit

        const category = req.query.category ;
        // Build the query based on search
        const query = {status:'published'}
        if(search){
            query.$or=[
                {
                    title: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    slug: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    excerpt: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ]
        }
        if(category){
            const categoryDoc = await Category.findOne({slug:category.toLowerCase()});
            if(!categoryDoc){
                return res.status(404).json({
                    status:false,
                    message:"Category not found."
                })
            }
            query.category = categoryDoc._id;
        }
        
        const totalPosts = await Post.countDocuments(query); //does the work of above two lines
        const totalPages = Math.ceil(totalPosts/limit);

        if (currentPage > totalPages && totalPages > 0) {
            return res.status(400).json({
                success: false,
                message: "Page does not exist"
            });
        }

        const posts = await Post.find(query).sort({publishedAt:-1}).skip(skip).limit(limit).populate("category");

        // const totalPosts = await Post.find(query);
        // const totalPostsCount = totalPosts.length

        return res.status(200).json({
            success:true,
            message:"Post retrieved successfully",
            posts:posts,
            pagination:{
                currentPage,
                totalPosts,
                totalPages
            }
        })

    }catch(error){
        console.error(`Internal Server Error : ${error}`);
        return res.status(500).json({
            success:false,
            message:"Failed to retrieve posts"
        })
    }
}
// Gets manage post
module.exports.getManagePosts = async (req,res)=>{
    try{
        const posts = await Post.find({}).sort({
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

// edit post
module.exports.editPost = async(req,res)=>{
    try{
        const id = req.params.id;
        const updatedPostData = req.body
        const existingPost = await Post.findById(id);

        if(!existingPost){
            return res.status(404).json({
                success:false,
                message:"Post not Found"
            })
        }
        // Handle publishedAt based on status change
        if(existingPost.status!== 'published' &&
            updatedPostData.status === 'published'
        ){
            updatedPostData.publishedAt = new Date();
        }

        if(existingPost.status=== 'published' &&
            updatedPostData.status !== 'published'
        ){
            updatedPostData.publishedAt = null;
        }
        

        await Post.findByIdAndUpdate(id,updatedPostData,{
            new:true,
            runValidators:true
        })
        return res.status(200).json({
            success:true,
            message:"Post Updated Successfully"
        })
    }catch(error){
        console.error(`Internal Server Error : ${error}`);
        return res.status(500).json({
            success:false,
            message:"Failed to Edit post"
        })
    }
}

// get edit post data
module.exports.getPostForEdit = async(req,res)=>{
    try{
        const id = req.params.id;
        const post = await Post.findById(id)
        if(!post){
            return res.status(404).json({
            success:false,
            message:"Post does not exist"
        })
        }
        return res.status(200).json({
            success:true,
            message:"Post found",
            post:post
        })
    }catch(error){
        console.error(`Internal Server Error : ${error}`);
        return res.status(500).json({
            success:false,
            message:"Failed to find post to edit"
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
                status,
                publishedAt:new Date.now()
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

        const deletedPost = await Post.findByIdAndDelete(postId);
        return res.status(200).json({
            status:"success",
            message:"Post Deleted successfully",
            deletedPost
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

