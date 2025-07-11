const passport = require('passport')
const validator = require('validator')
const Cake = require('../model/Cake')

exports.postCake = async (req, res, next) => {
  console.log("REQ.BODY:", req.body)
  try {
    if(!req.user){
      return res.status(401).json({msg: 'Not authorized. Please log in'})
    }

    const {id, image, name, description, quantity, price} = req.body
    const userId = req.user._id

    const item = await Cake.create({
      user: userId,
      cakeId: id,
      name,
      image,
      description,
      price,
      quantity
    })
    res.status(201).json({
      msg: 'Item added to Cart.', item})
  } catch (error) {
    return next(error);
  }
}

exports.getCake = async(req, res) => {
  try{
    const cakes = await Cake.find()
    res.json(cakes)
  }catch(err){
    res.status(500).json({error: err.message})
  }
}
exports.deleteCake = async(req, res) =>{
  try {
    const cakeId = req.params.itemId
    const deletedCake = await Cake.findByIdAndDelete(cakeId)
    console.log('Deleted Item')
    return res.status(200).json({message: 'Item deleted successfully'})
    
  } catch (error) {
    console.error(error)
    return res.status(500).json(error)
  }
}