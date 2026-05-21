export const normalizeProduct = (product) => ({
  ...product,
  id: product.slug || product.id || product._id,
  mongoId: product._id || product.mongoId,
});

export const normalizeProducts = (products = []) => products.map(normalizeProduct);
