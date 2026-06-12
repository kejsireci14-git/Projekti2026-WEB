const Appointment = require('../models/appointmentModel');
const Service = require('../models/serviceModel');


const getAppointments = async (req, res, next) => {
  try {
    let query;
    if (req.user.role === 'admin') {
      query = Appointment.find();
    } else {
      query = Appointment.find({ client: req.user._id });
    }

    const appointments = await query
      .populate('service', 'name category price duration')
      .populate('staff', 'name role photo')
      .populate('client', 'name email phone')
      .sort('-date');

    res.json({ success: true, count: appointments.length, data: appointments });
  } catch (error) {
    next(error);
  }
};


const getAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('service', 'name price duration')
      .populate('staff', 'name role')
      .populate('client', 'name email');

    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: 'Rezervimi nuk u gjet.' });
    }

  
    if (
      appointment.client._id.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res
        .status(403)
        .json({ success: false, message: 'Nuk keni leje.' });
    }

    res.json({ success: true, data: appointment });
  } catch (error) {
    next(error);
  }
};

const createAppointment = async (req, res, next) => {
  try {
    const { serviceId, staffId, date, timeSlot, notes } = req.body;

    const service = await Service.findById(serviceId);
    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: 'Shërbimi nuk u gjet.' });
    }

    const appointment = await Appointment.create({
      client: req.user._id,
      service: serviceId,
      staff: staffId,
      date,
      timeSlot,
      notes,
      totalPrice: service.price,
    });

    const populated = await appointment.populate([
      { path: 'service', select: 'name price duration' },
      { path: 'staff', select: 'name role' },
    ]);

    res.status(201).json({
      success: true,
      message: 'Rezervimi u krye me sukses!',
      data: populated,
    });
  } catch (error) {
    next(error);
  }
};


const updateAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: 'Rezervimi nuk u gjet.' });
    }

   
    const updateData =
      req.user.role === 'admin' ? req.body : { notes: req.body.notes };

    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      },
    )
      .populate('service', 'name price')
      .populate('staff', 'name');

    res.json({
      success: true,
      message: 'Rezervimi u përditësua!',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};


const deleteAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: 'Rezervimi nuk u gjet.' });
    }

    if (
      appointment.client.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res
        .status(403)
        .json({ success: false, message: 'Nuk keni leje.' });
    }

    await appointment.deleteOne();
    res.json({ success: true, message: 'Rezervimi u anulua me sukses!' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
