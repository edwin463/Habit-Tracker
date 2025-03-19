const API_BASE_URL = "http://127.0.0.1:5000"; // ✅ Ensure correct backend URL

// ✅ Get Logged-in User from localStorage
function getLoggedInUser() {
  return JSON.parse(localStorage.getItem("user"));
}

// ✅ Fetch a User by ID
export async function fetchUser(userId) {
    try {
      console.log("🔵 API Call: Fetching user...");
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        headers: { "Accept": "application/json" },
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || "User not found");
      }
  
      return await response.json();
    } catch (error) {
      console.error("🔴 Fetch User Error:", error.message);
      throw error;
    }
  }
  

// ✅ Register User
export async function registerUser(userData) {
  try {
    console.log("🔵 API Call: Registering user...", userData);
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Registration failed");
    }

    return await response.json();
  } catch (error) {
    console.error("🔴 Registration Error:", error.message);
    throw error;
  }
}

// ✅ Login User
export async function loginUser(userData) {
  try {
    console.log("🔵 API Call: Logging in user...", userData);
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Login failed");
    }

    const user = await response.json();
    console.log("🟢 API Response:", user);

    // ✅ Save logged-in user to localStorage
    localStorage.setItem("user", JSON.stringify(user.user));

    return user;
  } catch (error) {
    console.error("🔴 Login Error:", error.message);
    throw error;
  }
}

// ✅ Fetch User's Habits
export async function fetchHabits() {
  try {
    const user = getLoggedInUser();
    if (!user || !user.id) throw new Error("No logged-in user found");

    console.log(`🔵 API Call: Fetching habits for user: ${user.id}`);
    const response = await fetch(`${API_BASE_URL}/habits`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.id}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch habits");

    return await response.json();
  } catch (error) {
    console.error("🔴 Fetch Habits Error:", error.message);
    throw error;
  }
}

// ✅ Add a Habit
export async function addHabit(habitData) {
  try {
    const user = getLoggedInUser();
    if (!user || !user.id) throw new Error("No logged-in user found");

    console.log("🔵 API Call: Adding habit for user:", user.id, habitData);

    const response = await fetch(`${API_BASE_URL}/habits`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.id}`,
      },
      body: JSON.stringify(habitData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to add habit");
    }

    return await response.json();
  } catch (error) {
    console.error("🔴 Add Habit Error:", error.message);
    throw error;
  }
}

// ✅ Fetch Goals
export const fetchGoals = async () => {
    try {
        const response = await fetch("http://127.0.0.1:5000/goals", {
            method: "GET",
            headers: {
                "Authorization": "Bearer 1", // Replace with dynamic user ID
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);  // ✅ Debugging
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
        return [];
    }
};


// ✅ Add a Goal
export async function addGoal(goalData) {
    try {
      const user = getLoggedInUser();
      if (!user || !user.id) throw new Error("No logged-in user found");
  
      console.log("🔵 API Call: Adding goal for user:", user.id, goalData); // ✅ Debugging
  
      const response = await fetch(`${API_BASE_URL}/goals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.id}`,
        },
        body: JSON.stringify(goalData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("🔴 Server Error:", errorData);
        throw new Error(errorData.error || "Failed to add goal");
      }
  
      console.log("🟢 Goal added successfully!");
      return await response.json();
    } catch (error) {
      console.error("🔴 Add Goal Error:", error.message);
      throw error;
    }
  }
  

// ✅ DELETE Habit
export async function deleteHabit(habitId) {
  try {
    console.log("🔵 API Call: Deleting habit...");
    const user = getLoggedInUser();
    if (!user || !user.id) throw new Error("No logged-in user found");

    const response = await fetch(`${API_BASE_URL}/habits/${habitId}`, {
      method: "DELETE",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.id}`,
      },
    });

    if (!response.ok) throw new Error("Failed to delete habit");

    console.log("🟢 Habit deleted successfully");
  } catch (error) {
    console.error("🔴 Delete Habit Error:", error.message);
    throw error;
  }
}

// ✅ Logout User (Ensuring NO DUPLICATE EXPORT)
export function logoutUser() {
  console.log("🔵 Logging out user...");
  localStorage.removeItem("user");
}

// ✅ Fetch Habit Logs for Logged-in User
export async function fetchHabitLogs() {
    try {
      const user = getLoggedInUser();
      if (!user || !user.id) throw new Error("No logged-in user found");
  
      console.log("🔵 API Call: Fetching habit logs for user:", user.id);
      const response = await fetch(`${API_BASE_URL}/habit_logs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.id}`, // ✅ Ensure correct Authorization format
        },
      });
  
      if (!response.ok) throw new Error("Failed to fetch habit logs");
  
      return await response.json();
    } catch (error) {
      console.error("🔴 Fetch Habit Logs Error:", error.message);
      throw error;
    }
  }
  

  // ✅ Fetch Relationships for logged-in user
export async function fetchRelationships() {
    try {
      const user = getLoggedInUser();
      if (!user || !user.id) throw new Error("No logged-in user found");
  
      console.log("🔵 API Call: Fetching relationships...");
      const response = await fetch(`${API_BASE_URL}/relationships`, {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.id}`, // ✅ Ensure correct Authorization format
        },
      });
  
      if (!response.ok) throw new Error("Failed to fetch relationships");
  
      return await response.json();
    } catch (error) {
      console.error("🔴 Fetch Relationships Error:", error.message);
      throw error;
    }
  }
  
// ✅ Export all functions (NO DUPLICATES)

