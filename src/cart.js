const STORAGE_KEY = "cart-items";

function loadCart() {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

let cart = loadCart();
let listeners = new Set();

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function notify() {
  listeners.forEach((cb) => cb(cart));
}

export function addToCart(product) {
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  save();
  notify();
}

export function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  save();
  notify();
}

export function updateQty(id, qty) {
  cart = cart.map((item) =>
    item.id === id ? { ...item, qty: Math.max(1, qty) } : item
  );

  save();
  notify();
}

export function clearCart() {
  cart = [];
  save();
  notify();
}

export function getCart() {
  return cart;
}

export function subscribe(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function buyCart() {
  alert("Checkout system will be implemented later.");
}

const cartStore = {
  addToCart,
  removeFromCart,
  updateQty,
  clearCart,
  getCart,
  subscribe,
  buyCart,
};

export default cartStore;