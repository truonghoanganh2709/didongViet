import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import Coupon from '../models/Coupon.js';
import { validateAndCalcDiscount } from '../utils/couponHelper.js';

export const validateCoupon = asyncHandler(async (req, res) => {
  const { code, subtotal } = req.body;
  if (!code) throw new ApiError(400, 'Vui lòng nhập mã giảm giá');

  const { discount, coupon } = await validateAndCalcDiscount(code, Number(subtotal) || 0);

  res.json({
    success: true,
    data: {
      code: coupon.code,
      discount,
      type: coupon.type,
      value: coupon.value,
    },
  });
});

export const getCoupons = asyncHandler(async (_req, res) => {
  const coupons = await Coupon.find().sort({ createdAt: -1 });
  res.json({ success: true, data: coupons });
});

export const createCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.create({
    ...req.body,
    code: req.body.code?.toUpperCase().trim(),
  });
  res.status(201).json({ success: true, data: coupon });
});

export const updateCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);
  if (!coupon) throw new ApiError(404, 'Coupon not found');

  Object.assign(coupon, req.body);
  if (req.body.code) coupon.code = req.body.code.toUpperCase().trim();

  const updated = await coupon.save();
  res.json({ success: true, data: updated });
});

export const deleteCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);
  if (!coupon) throw new ApiError(404, 'Coupon not found');
  await coupon.deleteOne();
  res.json({ success: true, message: 'Coupon removed' });
});
