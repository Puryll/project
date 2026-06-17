
import initialProducts from "./Product";

const STORAGE_KEY = "hek-driloni-products";

function loadProducts() {
  if (typeof window === "undefined") return [...initialProducts];
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) return [...initialProducts];
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [...initialProducts];
  } catch {
    return [...initialProducts];
  }
}

const state = {
  products: loadProducts(),
  listeners: new Set(),
};

export function getProducts() {
  return state.products;
}

export function addProduct(product) {
  state.products.unshift(product);
  notify();
  persistProducts();
}

export function deleteProduct(id) {
  state.products = state.products.filter(p => p.id !== id);
  notify();
  persistProducts();
}

export function updateProduct(id, fields) {
  state.products = state.products.map(p => p.id === id ? { ...p, ...fields } : p);
  notify();
  persistProducts();
}

export function subscribe(cb) {
  state.listeners.add(cb);
  return () => state.listeners.delete(cb);
}

function notify() {
  for (const cb of state.listeners) cb(state.products);
}

function persistProducts() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.products));
  } catch {}
}

export function saveProducts() {
  persistProducts();
}

const secretData = { getProducts, addProduct, updateProduct, deleteProduct, subscribe, saveProducts };
export default secretData;
