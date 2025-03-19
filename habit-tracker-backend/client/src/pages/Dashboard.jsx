import React, { useState } from "react";
import HabitList from "../components/HabitList";
import HabitForm from "../components/HabitForm";
import Goals from "../components/Goals"; // ✅ Import Goals List
import GoalForm from "../components/GoalForm"; // ✅ Import Goal Form

const Dashboard = () => {
  const [habitRefresh, setHabitRefresh] = useState(false);
  const [goalRefresh, setGoalRefresh] = useState(false);

  const refreshHabits = () => {
    setHabitRefresh((prev) => !prev); // ✅ Toggle state to trigger re-render
  };

  const refreshGoals = () => {
    setGoalRefresh((prev) => !prev);
  };

  return (
    <div>
      <h1>Dashboard</h1>

      {/* ✅ Habit Section */}
      <h2>Your Habits</h2>
      <HabitForm onHabitAdded={refreshHabits} />
      <HabitList refreshTrigger={habitRefresh} /> {/* ✅ Pass refresh trigger */}

      {/* ✅ Goal Section */}
      <h2>Your Goals</h2>
      <GoalForm onGoalAdded={refreshGoals} />
      <Goals refreshTrigger={goalRefresh} />
    </div>
  );
};

export default Dashboard;
