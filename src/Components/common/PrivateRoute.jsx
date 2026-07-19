// AuthProvider.js
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

// ধরুন আপনার API সার্ভার এখানে
const fetchUserRole = async (email) => {
  try {
    const res = await fetch(`YOUR_API_URL/users/${email}`);
    const data = await res.json();
    return data.role; // ব্যাকএন্ড থেকে role আনুন
  } catch (err) {
    return null;
  }
};

const signInUser = async (email, password) => {
  setLoading(true);
  const result = await signInWithEmailAndPassword(auth, email, password);
  const role = await fetchUserRole(result.user.email);

  // ইউজার অবজেক্টে রোল সেট করে দিন
  setUser({ ...result.user, role });
  setLoading(false);
  return result;
};
