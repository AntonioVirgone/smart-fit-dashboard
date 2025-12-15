import { useState } from "react";
import type { Workout } from "../types/workout/Workout";
import PlanModal from "./PlanModal";
import type {Plan} from "../types/workout/Plan.ts";

type Props = {
    workouts: Workout[];
};

export default function WorkoutCardList({ workouts }: Props) {
    const [selectedWorkout, setSelectedWorkout] = useState<Plan | null>(null);

    return (
        <>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                    gap: "20px",
                    marginTop: "20px",
                }}
            >
                {workouts.map((workout) => (
                    <div
                        key={workout.id}
                        style={{
                            background: "rgb(255, 248, 225)",
                            border: "1px solid #ddd",
                            borderRadius: "10px",
                            padding: "18px",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                            display: "flex",
                            flexDirection: "column",
                            color: "black",
                        }}
                    >
                        <h3 style={{ margin: "0 0 10px" }}>{workout.name}</h3>

                        <div style={{ marginBottom: 6 }}>
                            <strong>📦 Plans:</strong> {workout.workoutPlans.length}
                        </div>

                        {workout.workoutPlans.map((workoutPlan) => (
                            <button
                                style={buttonStyle}
                                onClick={() => setSelectedWorkout(workoutPlan.plan)}
                            >
                                📋 Vedi {workoutPlan.plan.name}
                            </button>
                        ))}
                    </div>
                ))}
            </div>

            {/* MODALE */}
            {selectedWorkout && (
                <PlanModal
                    plan={selectedWorkout}
                    onClose={() => setSelectedWorkout(null)}
                />
            )}
        </>
    );
}

const buttonStyle: React.CSSProperties = {
    marginTop: "auto",
    marginBottom: "10px",
    padding: "8px",
    border: "none",
    borderRadius: "6px",
    background: "rgb(233 149 72)",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
};
