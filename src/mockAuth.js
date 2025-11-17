// src/api/mockAuth.js

export async function signup(form) {
    // simulate network delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ok: true, message: "Signup successful!" });
      }, 500);
    });
  }
  
  export async function signin(form) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ok: true, message: "Login successful!" });
      }, 500);
    });
  }
  