// ----------------------------------
// Imports                          
// ----------------------------------
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ----------------------------------
// Utility Function                 
// ----------------------------------
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// -------------------------------------------------------------------------------------
// Utility function to merge class names
// It takes any number of class names and returns a single string of merged class names
// It uses clsx to merge the class names and tailwind-merge to merge the class names
// It is a utility function that is used to merge class namess
// -------------------------------------------------------------------------------------