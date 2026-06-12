const Staff = require('../models/staffModel');


const getStaff = async (req, res, next) => {
  try {
    const staff = await Staff.find({ isAvailable: true }).sort('name');
    res.json({ success: true, count: staff.length, data: staff });
  } catch (error) {
    next(error);
  }
};


const getStaffMember = async (req, res, next) => {
  try {
    const member = await Staff.findById(req.params.id);
    if (!member) {
      return res
        .status(404)
        .json({ success: false, message: 'Punonjësja nuk u gjet.' });
    }
    res.json({ success: true, data: member });
  } catch (error) {
    next(error);
  }
};


const createStaff = async (req, res, next) => {
  try {
    const member = await Staff.create(req.body);
    res
      .status(201)
      .json({
        success: true,
        message: 'Punonjësja u shtua me sukses!',
        data: member,
      });
  } catch (error) {
    next(error);
  }
};


const updateStaff = async (req, res, next) => {
  try {
    const member = await Staff.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!member) {
      return res
        .status(404)
        .json({ success: false, message: 'Punonjësja nuk u gjet.' });
    }
    res.json({
      success: true,
      message: 'Punonjësja u përditësua!',
      data: member,
    });
  } catch (error) {
    next(error);
  }
};


const deleteStaff = async (req, res, next) => {
  try {
    const member = await Staff.findByIdAndDelete(req.params.id);
    if (!member) {
      return res
        .status(404)
        .json({ success: false, message: 'Punonjësja nuk u gjet.' });
    }
    res.json({ success: true, message: 'Punonjësja u fshi!' });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getStaff,
  getStaffMember,
  createStaff,
  updateStaff,
  deleteStaff,
};
