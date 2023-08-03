const {CartModel} = require('../model/cart');
const {ProductsModel} = require('../model/products');

const getCartData = async (req, res)=>{
    const cartData = await CartModel.findOne({userId:req.userInfo.userId});
    const productsArray = cartData.productIds;
    const products = [];
    for (let i=0; i<productsArray.length; i++){
        const product = {
            data : await ProductsModel.findById(productsArray[i].Id),
            count : productsArray[i].count
        }
        products.push(product);
    }
    return res.json(products);
}
const addToCart = async (req, res)=>{
    // const newProduct = [];
    // const newProducts = req.body.productId;
    // newProduct.push(newProducts);
    // const oldData = await CartModel.findOne({userId:req.userInfo.userId});
    // const oldproducts = oldData.productIds;
    // const allproducts = oldproducts.concat(newProduct);
    // await CartModel.updateOne({userId:req.userInfo.userId},{$set:{productIds:allproducts}})
    const isNew = await CartModel.findOne({"userId":req.userInfo.userId, "productIds.Id":req.body.productId})
    const newAddedProduct = {Id:"", count:1};
    const newProductId = req.body.productId;
    newAddedProduct.Id = newProductId;
    if(!isNew){
        const userCart = await CartModel.findOne({userId:req.userInfo.userId});
        const userCartData = userCart.productIds;
        userCartData.push(newAddedProduct);
        await CartModel.updateOne({userId:req.userInfo.userId},{$set:{productIds:userCartData}});
        return res.json({message:'Item sucessfully added to your cart!'})
    }
    return res.json({message:'This product is already in your Cart!'})
}
const deleteItem = async (req, res)=>{
    const removingData = req.body.productId
    await CartModel.updateOne({userId:req.userInfo.userId}, {$pull:{productIds:{Id: removingData}}});
    res.json({message:'Item deleted successfully !'})
}
const increament = async (req, res)=>{
    const addedItem = req.body.productId;
    const filter = { "userId": req.userInfo.userId, "productIds.Id": addedItem };
    const update = { $inc: { "productIds.$.count": 1 } };
    await CartModel.updateOne(filter, update, { new: true });
    res.json({message:'Cart updated Sucessfully !'});
}
const decreament = async (req, res)=>{
    const addedItem = req.body.productId;
    const filter = { "userId": req.userInfo.userId, "productIds.Id": addedItem };
    const update = { $inc: { "productIds.$.count": -1 } };
    await CartModel.updateOne(filter, update, { new: true });
    res.json({message:'Cart updated Sucessfully !'});
}

module.exports={
    getCartData,
    addToCart,
    deleteItem,
    increament,
    decreament
}