const Category = require('../Models/Category')


// Return all the categories
module.exports.getCategories = async (req,res)=>{
    try{
        const categories = await Category.find().sort({name:1})
        return res.status(200).json({
            success:true,
            categories
        })
    }catch(error){
        console.error(`Error fetching categories: ${error}`);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error(Failed to fetch categories)."
        })
    }
}

// Create category
module.exports.createCategory = async (req,res)=>{
    try{
        const {name,slug} = req.body;
        const newCategory = await Category.create({
            name,
            slug
        })
        return res.status(200).json({
            success:true,
            message:"New Category created!!",
            newCategory
        })
    }catch(error){
        console.error(`Error fetching categories: ${error}`);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error(Failed to create category.)."
        })
    }
}
