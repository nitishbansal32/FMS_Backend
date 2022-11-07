const express = require('express');
const router = express.Router();
const Tractor=require('../models/Tracktor_Inventory');

//const {createInventory} = require('../controllers/inventory');
router.post('/inventory', async (req, res) => {
    
    const entry = await Tractor.create(req.body);
   
    res.json({ tractor:entry});
  });
module.exports = router;