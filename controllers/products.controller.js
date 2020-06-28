const Product = require('../models/product.model');

exports.getAll = async (req, res) => {

  try {
    res.json(await Product.find());
  }
  catch (err) {
    res.status(500).json({ message: err});
  }
};

exports.getRandom = async (req, res) => {
  
  try {
    const count = await Product.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const prod = await Product.findOne().skip(rand);
    
    if(!prod) res.status(404).json({message: 'not Found!'});
    else res.json(prod);
  }
  catch (err) {
    res.status(500).json({ message: err});
  }
};

exports.getId = async (req, res) => {
  
  try {
    const prod = await Product.findById(req.params.id);
    if (!prod) res.status(404).json({message:'sorry, not found id' + (req.params.id)});
    else res.json(prod);
  }
  catch (err) {
    res.status(500).json({ message: err});
  }
};

exports.postNew = async (req, res) => {
  
  const {name, client} = req.body;

  try {
    const newProduct = new Product({name: name, client: client});
    await newProduct.save();
    res.json({message: 'Add new product:', newProduct});
  }
  catch (err) {
    res.status(500).json({ message: err});
  }
};

exports.putUpdate = async (req, res) => {
  const { name, client } = req.body;
 
  try {
    const product = await(Product.findById(req.params.id));

    if(product){
      await Product.updateOne({_id: req.params.id}, {$set: {name: name, client: client}});
      res.json({message:'Update to:', product});
    }
    else res.status(404).json({message: 'not found id: ' + req.params.id })
  }
  catch (err) {
    res.status(500).json({ message: err});
  }
};

exports.delete =  async(req, res) => {

  try {
    const product = await(Product.findById(req.params.id));

    if(product){
      await Product.deleteOne({_id: req.params.id});
      res.json({message: 'Delete: ', product});
    }
    else res.status(404).json({message: 'Sorry, not found product id:' + req.params.id});
  }
  catch (err) {
    res.status(500).json({ message: err});
  }
};