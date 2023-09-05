const Product=require("../models/productModels");
// const ApiFeatures = require("../utils/apifeatures");
const ApiFeatures = require("../utils/apifeatures");
const createApiFeatures = require('../utils/apifeatures'); // Adjust the path accordingly

// Your other imports and code


//create Product -- Admin only admin can access
exports.createProduct= async(req, res, next)=>{
    const product=await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
    console.log(product);
}


// Get All Product
exports.getAllProducts = (async (req, res, next) => {
    
    const resultPerPage=2;
    const productCount= await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);
  
    let products = await apiFeature.query;
    res.status(200).json({
      success: true,
      products,
      productCount,
    });
  });

//get single Product
exports.getProductDetails= async (req, res, next)=>{
    const product=await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product Not found"
        })
    }

    res.status(200).json({
        success:true,
        product
    })

}

//Update Product -- Admin
exports.updateProduct=async (req, res, next)=>{
    let product=await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product Not Found"
        })
    }

    product=await Product.findByIdAndUpdate(req.params.id, req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        product
    })
}




// Delete Product
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        await product.deleteOne(); // Use the deleteOne method

        res.status(200).json({
            success: true,
            message: "Product Deleted Successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the product"
        });
    }
};
