import type {Trainer} from "../types/Trainer.ts";

type Props = {
    trainers: Trainer[];
    onEdit?: (c: Trainer) => void;
    onDelete?: (c: Trainer) => void;
    onRegenerateCode?: (c: Trainer) => void;
    onCardClick?: (c: Trainer) => void;
};

export default function TrainerCardList({trainers, onCardClick}: Props) {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "20px",
                marginTop: "20px",
            }}
        >
            {trainers.map((trainer: Trainer) => (
                <div
                    key={trainer.id}
                    style={{
                        background: "#fff8e1",
                        border: "1px solid #ddd",
                        borderRadius: "10px",
                        padding: "18px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                        display: "flex",
                        flexDirection: "column",
                        color: "black",
                    }}
                >
                    <h3 style={{margin: "0 0 0"}}>{trainer.name}</h3>

                    <div style={{marginBottom: "25px", fontSize: "10px", opacity: 0.7}}>
                        <strong>ID:</strong> {trainer.id}
                    </div>

                    <div style={{marginBottom: 6}}>
                        <strong>📧 Email:</strong> {trainer.email}
                    </div>

                    <div style={{marginBottom: 6, display: "flex", alignItems: "center"}}>
                        <strong>🔐 Password:</strong>
                        <span style={{marginLeft: 6}}>{trainer.password}</span>
                    </div>

                    <div style={{marginBottom: 6}}>
                        <strong>🏃‍➡️ Customers:</strong>
                        <span style={{marginLeft: 6}}>{trainer.customers!.length}</span>
                    </div>

                    <div style={{marginBottom: "25px", fontSize: "10px", opacity: 0.7}}>
                        <button
                            style={{
                                marginLeft: "8px",
                                padding: "2px 6px",
                                borderRadius: "4px",
                                border: "1px solid #aaa",
                                background: "rgb(38 158 37)",
                                cursor: "pointer",
                                fontSize: "12px",
                            }}
                            onClick={() => onCardClick?.(trainer)}
                        >
                            Apri
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
