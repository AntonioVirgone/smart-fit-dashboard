import type {Plan} from "../types/workout/Plan.ts";

type Props = {
    plan: Plan;
    onClose: () => void;
};

export default function PlanModal({plan, onClose}: Props) {
    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <h2>{plan.name}</h2>

                <div
                    key={plan.id}
                    style={{
                        padding: "10px",
                        borderBottom: "1px solid #eee",
                    }}
                >
                    <strong>{plan.name}</strong>
                    <div style={{fontSize: "12px", opacity: 0.7}}>
                        ID: {plan.id}
                    </div>

                    {plan.planExercises.map((ex) => (
                        <div
                            key={ex.exercise.id}
                            style={{
                                border: "1px solid #eee",
                                borderRadius: "6px",
                                padding: "10px",
                                marginTop: "10px",
                            }}
                        >
                            <strong>{ex.exercise.name}</strong>
                            <span style={{fontSize: "12px", marginLeft: "6px", opacity: 0.7}}>
            ({ex.exercise.muscleGroup})
        </span>

                            <div style={{fontSize: "12px", marginTop: "4px"}}>
                                🧮 {ex.exercise.sets} × {ex.exercise.repetitions} | ⏱ {ex.exercise.recovery}s
                            </div>

                            {ex.exercise.description && (
                                <div style={{fontSize: "12px", marginTop: "4px", opacity: 0.8}}>
                                    {ex.exercise.description}
                                </div>
                            )}

                            {ex.exercise.instructions?.length > 0 && (
                                <ol style={{marginTop: "6px", fontSize: "12px", paddingLeft: "15px"}}>
                                    {ex.exercise.instructions.map((step, index) => (
                                        <li key={index}>{step}</li>
                                    ))}
                                </ol>
                            )}
                        </div>
                    ))}

                </div>

                <button style={closeButtonStyle} onClick={onClose}>
                    Chiudi
                </button>
            </div>
        </div>
    );
}

const overlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
    background: "rgb(255, 248, 225)",
    borderRadius: "10px",
    padding: "20px",
    width: "500px",
    maxHeight: "80vh",
    overflowY: "auto",
    color: "#000",
};

const closeButtonStyle: React.CSSProperties = {
    marginTop: "15px",
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
    background: "#dc3545",
    color: "white",
    cursor: "pointer",
};
