const { ProductsModel } = require('../model/products');

const getProductById = async(req, res)=> {
    const id = req.query.id
    const product = await ProductsModel.findById(id);
    return res.status(200).json(product);
}
const getBestSeller = async (req, res)=>{
    const bst1 = await ProductsModel.find({category:"Mobiles"}).limit(2);
    const bst2 = await ProductsModel.find({category:"Laptop"}).limit(2);
    const bst3 = await ProductsModel.find({category:"Watches"}).limit(2);
    const bst4 = await ProductsModel.find({category:"Monitor"}).limit(2);
    const bst5 = await ProductsModel.find({category:"Washing Machine"}).limit(2);
    const betSlrProducts = bst1.concat(bst2,bst3,bst4,bst5);
    return res.json(betSlrProducts);
}
const getSearchedProduct = async (req, res)=>{
    const searchedName = req.params.searchedFor
    const result = await ProductsModel.find({$text:{$search:`\"${searchedName}\"`}})
    return res.json(result)
}
const getHomePageProducts = async (req, res)=>{
    const products = await ProductsModel.find({rating:{$gt:4.5}}).limit(40);
    return res.json(products)
}
const getItemsbyCategory = async (req, res)=>{
    const category = req.params.category
    switch (category){
        case 'laptops':
            const laptops = await ProductsModel.find({category:"Laptop"});
            return res.json(laptops);
        case 'mobiles':
            const mobiles = await ProductsModel.find({category:"Mobiles"});
            return res.json(mobiles);
        case 'earphones':
            const erphn = await ProductsModel.find({category:"Earphones"});
            return res.json(erphn);
        case 'desktops':
            const dsktp = await ProductsModel.find({category:{$in:["Monitor", "Processor", "Keyboard", "Printer"]}});
            return res.json(dsktp);
        case 'blt_speakers':
            const blSpkr = await ProductsModel.find({category:"Bluetooth Speaker"});
            return res.json(blSpkr);
        case 'cables':
            const cbl = await ProductsModel.find({category:{$in:["Charger", "Data Cable"]}});
            return res.json(cbl);
        case 'cameras':
            const cmra = await ProductsModel.find({category:"Camera"});
            return res.json(cmra);
        case 'furnitures':
            const frntr = await ProductsModel.find({category:{$in:["Wardrobe", "Recliner", "Table"]}});
            return res.json(frntr);
        case 'dcrations':
            const dcrn = await ProductsModel.find({category:{$in:["Home Decoration", "Bedsheet Set"]}});
            return res.json(dcrn);
        case 'ktcn_accsris':
            const ktAcs = await ProductsModel.find({category:{$in:["Mixer", "Oven", "Dinner Set", "Chimney"]}});
            return res.json(ktAcs);
        case 'ent_accsris':
            const entAcs = await ProductsModel.find({category:{$in:["Television", "Chess Set", "Home Theatre", "Carrom Board"]}});
            return res.json(entAcs);
        case 'aud_accsris':
            const auAcs = await ProductsModel.find({category:{$in:["Bluetooth Speaker", "Home Theatre", "Earphones"]}});
            return res.json(auAcs);
        case 'mbl_accsris':
            const mblAcs = await ProductsModel.find({category:{$in:["Powerbank", "Charger", "Data Cable"]}});
            return res.json(mblAcs);
        case 'ac_frg_wm':
            const acWmFr = await ProductsModel.find({category:{$in:["Ac", "Refrigerators", "Washing Machine"]}});
            return res.json(acWmFr);
        case 'fsn_accsris':
            const fsnAcs = await ProductsModel.find({category:{$in:["Watches", "Sunglasses"]}});
            return res.json(fsnAcs);
        case 'men_topwear':
            const mnTpWr = await ProductsModel.find({category:{$in:["T-Shirt", "Casual Shirt"]}});
            return res.json(mnTpWr);
        case 'men_btmwear':
            const mnBtmWr = await ProductsModel.find({category:{$in:["Men's Trousers", "Men's Jeans"]}});
            return res.json(mnBtmWr);
        case 'men_ftwr':
            const mnFtwr = await ProductsModel.find({category:"Shoes"});
            return res.json(mnFtwr);
        case 'men_ethnic':
            const mnetnc = await ProductsModel.find({category:"Men's Kurta Set"});
            return res.json(mnetnc);
        case 'men_wntrwear':
            const mnwnwr = await ProductsModel.find({category:"Winter Wear for Men"});
            return res.json(mnwnwr);
        case 'sarees':
            const saree = await ProductsModel.find({category:"Sarees"});
            return res.json(saree);
        case 'wmn_btmwear':
            const wmBtmWr = await ProductsModel.find({category:{$in:["Women's Trousers", "Women's Jeans"]}});
            return res.json(wmBtmWr);
        case 'wmn_ftwr':
            const wmFtwr = await ProductsModel.find({category:"Women's Footwear"});
            return res.json(wmFtwr);
        case 'wmn_ethnic':
            const wmetnc = await ProductsModel.find({category:"Women's Ethnic"});
            return res.json(wmetnc);
        case 'wmn_wntrwear':
            const wmwnwr = await ProductsModel.find({category:"Winter Wear for Women"});
            return res.json(wmwnwr);
        case 'men_all':
            const mnAll = await ProductsModel.find({category:{$in:["T-Shirt", "Casual Shirt", "Men's Trousers", "Men's Jeans", "Shoes", "Men's Kurta Set", "Winter Wear for Men"]}});
            return res.json(mnAll);
        case 'women_all':
            const wmAll = await ProductsModel.find({category:{$in:["Women's Trousers", "Women's Jeans", "Sarees", "Women's Footwear", "Women's Ethnic", "Winter Wear for Women"]}});
            return res.json(wmAll);
        case 'daily_aplncs':
            const dlApl = await ProductsModel.find({category:{$in:["Iron", "Trimmers", "Hair Dryers", "Electric Kettle"]}});
            return res.json(dlApl);
        case 'home_aplncs':
            const hmApl = await ProductsModel.find({category:{$in:["Ac", "Refrigerators", "Washing Machine", "Home Theatre", "Wardrobe", "Recliner", "Table"]}});
            return res.json(hmApl);
        default:
            return res.send({message:'sorry! there is no such data.'})
    }
}

module.exports = {
    getProductById,
    getBestSeller,
    getItemsbyCategory,
    getSearchedProduct,
    getHomePageProducts
}
