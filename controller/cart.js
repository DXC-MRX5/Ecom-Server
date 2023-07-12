const {CartModel} = require('../model/cart');
const {ProductsModel} = require('../model/products');

const getCartData = async (req, res)=>{
    const cartData = await CartModel.findOne({userId:req.userInfo.userId});
    const productsArray = cartData.productIds;
    const products = [];
    for (let i=0; i<productsArray.length; i++){
        const product = await ProductsModel.findById(productsArray[i]);
        products.push(product);
    }
    return res.json(products);
}
const addToCart = async (req, res)=>{
    const newProduct = [];
    const newProducts = req.body.productId;
    newProduct.push(newProducts);
    const oldData = await CartModel.findOne({userId:req.userInfo.userId});
    const oldproducts = oldData.productIds;
    const allproducts = oldproducts.concat(newProduct);
    await CartModel.updateOne({userId:req.userInfo.userId},{$set:{productIds:allproducts}})
    res.json({message:'Item sucessfully added to your cart!'})
}
const deleteItem = async (req, res)=>{
    const removingData = req.body.productId
    await CartModel.updateOne({userId:req.userInfo.userId},{$pull:{productIds:removingData}});
    res.json({message:'Item deleted successfully !'})
}
// const deleteItem = async (req, res) => {
//     const removingData = req.body.productId;
  
//     const result = await CartModel.updateOne(
//       { userId: req.userInfo.userId },
//       {
//         $pull: { productIds: removingData },
//         $inc: { productIdsCount: -1 }
//       }
//     );
  
//     if (result.nModified > 0) {
//       res.json({ message: 'Item deleted successfully!' });
//     } else {
//       res.json({ message: 'Item not found!' });
//     }
//   };

module.exports={
    getCartData,
    addToCart,
    deleteItem
}