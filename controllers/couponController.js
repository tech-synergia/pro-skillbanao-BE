const { BadRequestError } = require("../errors");
const couponModel = require("../models/Coupon");
const { StatusCodes } = require("http-status-codes");

const addCoupon = async (req, res) => {
  const coupon = await couponModel.create(req.body);
  res.status(StatusCodes.CREATED).json({
    coupon,
  });
};

const deleteCoupon = async (req, res) => {
  const { couponId } = req.body;
  const coupon = await couponModel.findOneAndDelete({ _id: couponId });
  if (!coupon) throw new BadRequestError("Coupon not found!");
  res.status(StatusCodes.OK).json({ msg: "Coupon removed successfully!" });
};

const showCoupons = async (req, res) => {
  const coupons = await couponModel.find({});
  res.status(StatusCodes.OK).json({ coupons });
};

const validCoupon = async (req, res) => {
  const { code } = req.params;
  const coupon = await couponModel
    .findOne({ code })
    .select({ minutes: 1, _id: 0 });
  if (!coupon) {
    throw new BadRequestError("Coupon isn't valid!");
  }

  res.status(StatusCodes.OK).json({ msg: "Coupon is valid", coupon });
};

module.exports = { addCoupon, deleteCoupon, showCoupons, validCoupon };
