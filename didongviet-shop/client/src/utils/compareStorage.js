const KEY = 'ddv_compare';
const MAX = 3;

export const getCompareList = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
};

export const addToCompare = (product) => {
  const list = getCompareList().filter((p) => p._id !== product._id);
  if (list.length >= MAX) {
    list.shift();
  }
  list.push({
    _id: product._id,
    name: product.name,
    slug: product.slug,
    brand: product.brand,
    price: product.price,
    salePrice: product.salePrice,
    thumbnail: product.thumbnail,
    specs: product.specs,
    rating: product.rating,
  });
  localStorage.setItem(KEY, JSON.stringify(list));
  return list;
};

export const removeFromCompare = (productId) => {
  const list = getCompareList().filter((p) => p._id !== productId);
  localStorage.setItem(KEY, JSON.stringify(list));
  return list;
};

export const clearCompare = () => {
  localStorage.removeItem(KEY);
  return [];
};

export const isInCompare = (productId) => getCompareList().some((p) => p._id === productId);

export const COMPARE_MAX = MAX;
