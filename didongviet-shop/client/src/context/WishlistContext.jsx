import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as wishlistService from '../services/wishlistService';
import { useAuth } from '../hooks/useAuth';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(false);

  const wishlistIds = useMemo(
    () => new Set((wishlist?.products || []).map((p) => (typeof p === 'string' ? p : p._id))),
    [wishlist]
  );

  const fetchWishlist = useCallback(async () => {
    if (!isAuthenticated) {
      setWishlist(null);
      return;
    }
    setLoading(true);
    try {
      const { data } = await wishlistService.getWishlist();
      setWishlist(data.data);
    } catch {
      setWishlist(null);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const toggle = async (productId) => {
    const { data } = await wishlistService.toggleWishlist(productId);
    setWishlist(data.data);
    return data.added;
  };

  const isInWishlist = (productId) => wishlistIds.has(productId);

  const value = useMemo(
    () => ({
      wishlist,
      wishlistCount: wishlist?.products?.length || 0,
      loading,
      fetchWishlist,
      toggle,
      isInWishlist,
    }),
    [wishlist, loading, fetchWishlist, wishlistIds]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlistContext = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlistContext must be used within WishlistProvider');
  return ctx;
};
