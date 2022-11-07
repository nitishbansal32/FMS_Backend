const {Tractor}=require('../models/Tracktor_Inventory');
const createInventory = async (req, res) => {
    
    const entry = await Tractor.create(req.body);
    await entry.save();
    res.json({ tractor:entry});
  };
  
  module.exports=createInventory;