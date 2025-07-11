const passport = require('passport')
const validator = require('validator')
const Cake = require('../model/Cake')

exports.postCake = async (req, res, next) => {                            //Function for adding a cake item to the shopping cart
  console.log("REQ.BODY:", req.body)
  try {
    const {id, image, name, description, quantity, price} = req.body      // Destructure cake properties from the request body (either for a new cake or an existing one)


    const existingItem = await Cake.findOne({name})                       // Variable to Check if an item with the same name already exists

    if(existingItem){                                                     // If the item already exists, increase the quantity by the amount in the request
      existingItem.quantity += quantity
      await existingItem.save()                                           //Save the updated quantity in the existing item

      return res.status(200).json({                                       // Return a 200 OK response with the updated item
        msg:'quantity updated for existingItem',
        item: existingItem                                                // item is now existingItem
      })
    }

    const newItem = await Cake.create({                                  // If the item does not exist, create a new one in the database
      cakeId: id,                   
      name,
      image,
      description,
      price,
      quantity
    })
    return res.status(201).json({                                       // Return a 201 Created response with the new item
      msg:'New item created and added to cart',
      item: newItem                                                     // the given back item will be the new Item
    })
    
  } catch (error) {                                                    // If an error occurs, pass it to the error-handling middleware
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

exports.deleteAll = async(req, res) => {
  try {
    const deleteAll = await Cake.deleteMany()
    console.log('All item deleted')
    return res.status(200).json({message: 'All items deleted'})
  } catch (error) {
    console.error(error)
    return res.status(500).json(error)
  }
}