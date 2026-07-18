import React, { createContext, useEffect, useState, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register new user
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Sign in existing user
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Sign in with Google
  const signInGoogle = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // Log out user
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Update user profile
  const updateUserProfile = (name, photo) => {
    if (!auth.currentUser) {
      return Promise.reject(new Error("No user logged in"));
    }
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo || "",
    });
  };

  // 📌 ইউজারের রোল নির্ধারণ (ইমেইল ভিত্তিক)
  const getUserRole = (email) => {
    if (!email) return "student";

    // predefined roles
    const roleMap = {
      "admin@tarabiyah.com": "admin",
      "teacher@tarabiyah.com": "teacher",
    };

    // Check if email matches predefined roles
    if (roleMap[email]) {
      return roleMap[email];
    }

    // Default role
    return "student";
  };

  // Track auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // ইউজারের রোল নির্ধারণ
        const role = getUserRole(currentUser.email);

        // ইউজার অবজেক্টে role যোগ করুন
        const userWithRole = {
          ...currentUser,
          role: role,
        };

        console.log("User from Firebase:", {
          uid: userWithRole.uid,
          email: userWithRole.email,
          displayName: userWithRole.displayName,
          photoURL: userWithRole.photoURL,
          role: userWithRole.role,
        });

        setUser(userWithRole);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    registerUser,
    signInUser,
    signInGoogle,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

// useAuth Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
