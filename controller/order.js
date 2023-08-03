const {CartModel} = require('../model/cart');
const { orderModel } = require('../model/order');
const {ProductsModel} = require('../model/products');

const addToHistory = async (req, res)=>{
    const oldData = await CartModel.findOne({userId:req.userInfo.userId});
    await CartModel.updateOne({userId:oldData.userId},{$set:{productIds:[]}})
    const history = await orderModel.findOne({userId:oldData.userId});
    if(!history){
        await orderModel.create({userId:oldData.userId, productIds:oldData.productIds});
        return res.json({message:'Your order placed successfully!'})
    }
    const newHistory = history.productIds.concat(oldData.productIds);
    await orderModel.updateOne({userId:oldData.userId},{$set:{productIds:newHistory}});
    return res.json({message:'Your order placed successfully!'})
}
const getFromHistory = async (req, res)=>{
    const historyData = await orderModel.findOne({userId:req.userInfo.userId});
    const productHistory = historyData.productIds;
    const products = [];
    for (let i=0; i<productHistory.length; i++){
        const product = {
            data: await ProductsModel.findById(productHistory[i].Id),
            count: productHistory[i].count
        }
        products.push(product);
    }
    return res.json(products);
}

module.exports={
    addToHistory,
    getFromHistory
}