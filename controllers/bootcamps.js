const ErrorResponse = require("../utils/errorResponse");
const Bootcamp = require("../models/Bootcamp");

// @desc        Get all bootcamps
// @route       Get /api/v1/bootcamps
// @access      Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res
      .status(200)
      .json({ success: true, count: bootcamps.length, data: bootcamps });
  } catch (error) {
    next(error);
  }
};

// @desc        Get single bootcamp
// @route       Get /api/v1/bootcamps/:id
// @access      Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      return new ErrorResponse(
        `Bootcamp not found with id of ${req.params.id}`,
        404
      );
    }

    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    //res.status(400).json({ success: false });
    next(error);
  }
};

// @desc        Create new bootcamp
// @route       POST /api/v1/bootcamps/:id
// @access      Private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true,
      data: bootcamp
    });
  } catch (error) {
    next(error);
  }
};

// @desc        Update bootcamp
// @route       PUT /api/v1/bootcamps/:id
// @access      Private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!bootcamp) {
      return new ErrorResponse(
        `Bootcamp not found with id of ${req.params.id}`,
        404
      );
    }

    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    next(error);
  }
};

// @desc        Delete bootcamp
// @route       PUT /api/v1/bootcamps/:id
// @access      Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndRemove(req.params.id);

    if (!bootcamp) {
      return new ErrorResponse(
        `Bootcamp not found with id of ${req.params.id}`,
        404
      );
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
