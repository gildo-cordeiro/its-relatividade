import { useState, useEffect } from "react";

/**
 * Custom hook to sync state with localStorage.
 * 
 * @param {string} key LocalStorage key name
 * @param {*} initialValue Initial value or a function that returns it
 * @returns {[*, Function]} State and setter function
 */
export function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved !== null && saved !== "undefined") {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn(`Error reading localStorage key "${key}":`, e);
    }
    return typeof initialValue === "function" ? initialValue() : initialValue;
  });

  useEffect(() => {
    try {
      if (state === undefined) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(state));
      }
    } catch (e) {
      console.warn(`Error setting localStorage key "${key}":`, e);
    }
  }, [key, state]);

  return [state, setState];
}
