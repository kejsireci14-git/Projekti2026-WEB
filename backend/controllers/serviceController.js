const Service = require('../models/serviceModel');


const getServices = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = { isActive: true };
    if (category) filter.category = category;

    const services = await Service.find(filter).sort('category name');
    res.json({ success: true, count: services.length, data: services });
  } catch (error) {
    next(error);
  }
};

const getService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: 'Shërbimi nuk u gjet.' });
    }
    res.json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};


const createService = async (req, res, next) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Shërbimi u shtua me sukses!',
      data: service,
    });
  } catch (error) {
    next(error);
  }
};


const updateService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: 'Shërbimi nuk u gjet.' });
    }
    res.json({
      success: true,
      message: 'Shërbimi u përditësua!',
      data: service,
    });
  } catch (error) {
    next(error);
  }
};


const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: 'Shërbimi nuk u gjet.' });
    }
    res.json({ success: true, message: 'Shërbimi u fshi me sukses!' });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
};
