import Coupon from '../models/Coupon.js';
import { ApiError } from './ApiError.js';

export const validateAndCalcDiscount = async (code, subtotal) => {
  if (!code) return { discount: 0, coupon: null };

  const coupon = await Coupon.findOne({
    code: code.toUpperCase().trim(),
    isActive: true,
  });

  if (!coupon) throw new ApiError(400, 'Mã giảm giá không hợp lệ');
  if (coupon.expiresAt < new Date()) throw new ApiError(400, 'Mã giảm giá đã hết hạn');
  if (coupon.usedCount >= coupon.usageLimit) throw new ApiError(400, 'Mã giảm giá đã hết lượt dùng');
  if (subtotal < coupon.minOrder) {
    throw new ApiError(400, `Đơn tối thiểu ${coupon.minOrder.toLocaleString('vi-VN')}đ để dùng mã này`);
  }

  let discount = 0;
  if (coupon.type === 'percent') {
    discount = Math.round((subtotal * coupon.value) / 100);
    if (coupon.maxDiscount) discount = Math.min(discount, coupon.maxDiscount);
  } else {
    discount = coupon.value;
  }

  discount = Math.min(discount, subtotal);

  return { discount, coupon };
};
