const Item = require('../models/item')

const getItemsByTask = async (req, res) => {
  try {
    const items = await Item.find({ task: req.params.taskId })
    return res.status(200).json(items)
  } catch (error) {
    console.log(error);
    return res.end()
  }
};

const createItemByTask = async (req, res) => {
  try {
    const item = await Item.create({
      task: req.params.taskId,
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      dueDate: req.body.dueDate,
      timeSpent: req.body.timeSpent,
    })
    return res.status(200).json(item)
  } catch (error) {
    console.log(error);
    return res.end()
  }
};

const updateItemByTask = async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);
    const newItem = await Item.findByIdAndUpdate(req.params.itemId, {
      title: req.body.title ? req.body.title : item.title,
      description: req.body.description ? req.body.description : item.description,
      status: req.body.status ? req.body.status : item.status,
      dueDate: req.body.dueDate ? req.body.dueDate : item.dueDate,
      timeSpent: req.body.timeSpent ? req.body.timeSpent : item.timeSpent,
    });
    return res.json({ item: newItem })
  } catch (error) {
    console.log(error);
  }
};

const deleteItemByTask = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.end()
  }
};

module.exports = {
  getItemsByTask,
  createItemByTask,
  updateItemByTask,
  deleteItemByTask,
};
