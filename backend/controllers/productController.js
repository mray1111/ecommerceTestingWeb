const Product=require("../models/productModels");
// const ApiFeatures = require("../utils/apifeatures");
const ApiFeatures = require("../utils/apifeatures");
const createApiFeatures = require('../utils/apifeatures'); // Adjust the path accordingly
const ErrorHander = require("../utils/errorHander");
const catchAsyncErrors=require("../middleware/catchAsyncErrors");

//create Product -- Admin only admin can access
exports.createProduct= catchAsyncErrors(async(req, res, next)=>{
    req.body.user=req.user.id;
    
    const product=await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
    //console.log(product);
})


// Get All Product
exports.getAllProducts =catchAsyncErrors((async(req, res, next) => {
    
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
  }));

//get single Product
exports.getProductDetails= catchAsyncErrors(async (req, res, next)=>{
    const product=await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHander("Product Not found ",404)); 
    }

    res.status(200).json({
        success:true,
        product,
    })

});

//Update Product -- Admin
exports.updateProduct= catchAsyncErrors(async (req, res, next)=>{
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
});




// Delete Product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
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
});


// Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
  
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
  
    const product = await Product.findById(productId);
  
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
  
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
  
    let avg = 0;
  
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    product.ratings = avg / product.reviews.length;
  
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
  });
  