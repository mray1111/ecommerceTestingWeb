const Product=require("../models/productModels");


//create Product
exports.createProduct= async(req, res, next)=>{
    const product=await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
    console.log(product);
}

console.log(Product)

exports.getAllProducts= (req, res) =>{
    res.status(200).json({message:"Route is working fine"})
}

