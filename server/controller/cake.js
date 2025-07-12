const Cake = require('../model/Cake')

// 🧁 POST /cakes/add
exports.postCake = async (req, res, next) => {
  try {
    const { guestId, ...cakeData } = req.body
    const { id, image, name, description, quantity = 1, price } = cakeData

    const identifier = req.user
      ? { userId: req.user._id }
      : guestId
      ? { guestId }
      : null

    if (!identifier) {
      return res.status(400).json({ msg: 'No user or guest ID provided' })
    }

    // ✅ Suche nach vorhandenem Kuchen für diesen spezifischen user/guest
    const existingItem = await Cake.findOne({ ...identifier, name })

    if (existingItem) {
      existingItem.quantity += quantity
      await existingItem.save()
      return res.status(200).json({
        msg: 'Quantity updated for existing item',
        item: existingItem,
      })
    }

    // ✅ Erstelle neuen Cake-Eintrag mit guestId oder userId
    const newItem = await Cake.create({
      ...identifier,
      cakeId: id,
      name,
      image,
      description,
      price,
      quantity,
    })

    return res.status(201).json({
      msg: 'New item created and added to cart',
      item: newItem,
    })
  } catch (error) {
    return next(error)
  }
}

// 🧁 GET /cakes?guestId=xyz
exports.getCake = async (req, res) => {
  try {
    const guestId = req.query.guestId
    const identifier = req.user
      ? { userId: req.user._id }
      : guestId
      ? { guestId }
      : null

    if (!identifier) {
      return res.status(400).json({ msg: 'No user or guest ID provided' })
    }

    const cakes = await Cake.find(identifier)
    res.json(cakes)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// 🧁 DELETE /cakes/delete/:itemId
exports.deleteCake = async (req, res) => {
  try {
    const { guestId } = req.query
    const identifier = req.user
      ? { userId: req.user._id }
      : guestId
      ? { guestId }
      : null

    if (!identifier) {
      return res.status(400).json({ msg: 'No user or guest ID provided' })
    }

    const cakeId = req.params.itemId
    const deletedCake = await Cake.findOneAndDelete({
      ...identifier,
      _id: cakeId,
    })

    if (!deletedCake) {
      return res.status(404).json({ msg: 'Item not found' })
    }

    return res.status(200).json({ msg: 'Item deleted successfully' })
  } catch (error) {
    return res.status(500).json(error)
  }
}

// 🧁 DELETE /cakes/delete (löscht ALLE Einträge)
exports.deleteAll = async (req, res) => {
  try {
    const { guestId } = req.query
    const identifier = req.user
      ? { userId: req.user._id }
      : guestId
      ? { guestId }
      : null

    if (!identifier) {
      return res.status(400).json({ msg: 'No user or guest ID provided' })
    }

    await Cake.deleteMany({ ...identifier })
    return res.status(200).json({ msg: 'All items deleted' })
  } catch (error) {
    return res.status(500).json(error)
  }
}
