import React, { createContext, useState, useContext } from 'react';
import { mockDashboardData } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "Alexander Mercer",
    email: "alexander@mercer.luxury",
    phone: "+91 98765 43210",
    loyaltyTier: "Imperial Royal Elite",
    points: 12500,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
  });

  const [bookings, setBookings] = useState(mockDashboardData.myBookings);
  const [reservations, setReservations] = useState(mockDashboardData.myReservations);
  const [foodOrders, setFoodOrders] = useState(mockDashboardData.myFoodOrders);
  const [wishlist, setWishlist] = useState(["lake-view-suite"]);
  const [cart, setCart] = useState([]);
  const [notifications, setNotifications] = useState([
    { id: 1, type: "system", text: "Welcome to Hotel Sahana. Your Royal Butler is at your service.", time: "Just now", read: false },
    { id: 2, type: "booking", text: "Your upcoming stay in the Prana Lake View Suite is confirmed.", time: "1 hour ago", read: false }
  ]);

  const addNotification = (text, type = "system") => {
    setNotifications(prev => [
      { id: Date.now(), type, text, time: "Just now", read: false },
      ...prev
    ]);
  };

  const addRoomBooking = (bookingData) => {
    const newBooking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      status: "Confirmed",
      ...bookingData
    };
    setBookings(prev => [newBooking, ...prev]);
    setUser(prev => ({ ...prev, points: prev.points + Math.floor(newBooking.amount / 10) }));
    addNotification(`Your booking for ${newBooking.roomName} has been confirmed.`, "booking");
    return newBooking;
  };

  const cancelBooking = (bookingId) => {
    setBookings(prev =>
      prev.map(b => b.id === bookingId ? { ...b, status: "Cancelled" } : b)
    );
    addNotification(`Booking ${bookingId} has been successfully cancelled.`, "booking");
  };

  const addTableReservation = (resData) => {
    const newReservation = {
      id: `RS-${Math.floor(1000 + Math.random() * 9000)}`,
      status: "Confirmed",
      ...resData
    };
    setReservations(prev => [newReservation, ...prev]);
    addNotification(`Table reservation for ${newReservation.guests} guests on ${newReservation.date} is confirmed.`, "restaurant");
    return newReservation;
  };

  const cancelReservation = (resId) => {
    setReservations(prev =>
      prev.map(r => r.id === resId ? { ...r, status: "Cancelled" } : r)
    );
    addNotification(`Table reservation ${resId} has been cancelled.`, "restaurant");
  };

  const addToCart = (foodItem) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === foodItem.id);
      if (existing) {
        return prev.map(item =>
          item.id === foodItem.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...foodItem, qty: 1 }];
    });
    addNotification(`Added "${foodItem.name}" to your dining cart.`, "cart");
  };

  const removeFromCart = (foodId) => {
    setCart(prev => prev.filter(item => item.id !== foodId));
  };

  const updateCartQty = (foodId, qty) => {
    if (qty <= 0) {
      removeFromCart(foodId);
      return;
    }
    setCart(prev =>
      prev.map(item => item.id === foodId ? { ...item, qty } : item)
    );
  };

  const checkoutCart = (roomNumber = "Room 402") => {
    if (cart.length === 0) return null;
    
    const newOrder = {
      id: `OD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      items: cart.map(item => ({ name: item.name, qty: item.qty, price: item.price })),
      total: cart.reduce((acc, item) => acc + (item.price * item.qty), 0),
      status: "In Kitchen",
      deliveryTarget: roomNumber
    };
    
    setFoodOrders(prev => [newOrder, ...prev]);
    setCart([]);
    addNotification(`Order ${newOrder.id} has been sent to the kitchen. Delivering to ${roomNumber}.`, "restaurant");
    return newOrder;
  };

  const toggleWishlist = (roomId) => {
    setWishlist(prev => {
      const exists = prev.includes(roomId);
      if (exists) {
        addNotification(`Removed room from your wishlist.`, "system");
        return prev.filter(id => id !== roomId);
      } else {
        addNotification(`Added room to your wishlist.`, "system");
        return [...prev, roomId];
      }
    });
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getCartCount = () => {
    return cart.reduce((acc, item) => acc + item.qty, 0);
  };

  const getCartTotal = () => {
    return cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  };

  const logout = () => {
    setUser(null);
    addNotification("You have been logged out of your guest session.", "system");
  };

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      logout,
      bookings,
      addRoomBooking,
      cancelBooking,
      reservations,
      addTableReservation,
      cancelReservation,
      foodOrders,
      wishlist,
      toggleWishlist,
      cart,
      addToCart,
      removeFromCart,
      updateCartQty,
      checkoutCart,
      getCartCount,
      getCartTotal,
      notifications,
      addNotification,
      clearNotifications,
      markAllNotificationsRead
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
