import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy
} from "firebase/firestore";

import { db } from "./firebase";

const PRODUCTS_COLLECTION = "products";

const state = {
  products: [],
  listeners: new Set(),
};

function notify() {
  state.listeners.forEach((cb) => cb(state.products));
}

/**
 * LIVE SYNC from Firestore
 */
export function initProductsListener() {
  const q = query(
    collection(db, PRODUCTS_COLLECTION),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    state.products = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    notify();
  });
}

export function getProducts() {
  return state.products;
}

/**
 * ADD PRODUCT → Firestore
 */
export async function addProduct(product) {
  await addDoc(collection(db, PRODUCTS_COLLECTION), {
    ...product,
    createdAt: serverTimestamp(),
  });
}

/**
 * DELETE PRODUCT → Firestore
 */
export async function deleteProduct(id) {
  await deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
}

/**
 * UPDATE PRODUCT → Firestore
 */
export async function updateProduct(id, fields) {
  await updateDoc(doc(db, PRODUCTS_COLLECTION, id), fields);
}

/**
 * UI subscriptions (same behavior as before)
 */
export function subscribe(cb) {
  state.listeners.add(cb);
  return () => state.listeners.delete(cb);
}

/**
 * optional (kept for compatibility, does nothing now)
 */
export function saveProducts() {}

const secretData = {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  subscribe,
  initProductsListener,
  saveProducts,
};

export default secretData;