import type { Customer } from "../types/Customer";

type Props = {
    customers: Customer[];
    onActivate?: (c: Customer) => void;
    onDeactivate?: (c: Customer) => void;
    onEdit?: (c: Customer) => void;
    onDelete?: (c: Customer) => void;
    onRegenerateCode?: (c: Customer) => void;
};

export default function CustomerCardList({ customers, onActivate, onDeactivate, onEdit, onDelete, onRegenerateCode }: Props) {
    const getStatusColor = (status?: string) => {
        switch (status) {
            case "active":
                return "#d4edda"; // verde chiaro
            case "pending":
                return "#fff3cd"; // giallo chiaro
            case "disabled":
                return "#f8d7da"; // rosso chiaro
            default:
                return "#f0f0f0"; // default grigio
        }
    };

    function getStatusButton(c: Customer) {
        if (c.status === "pending") {
            return (
                <button
                    style={buttonStyle("green")}
                    onClick={() => onActivate?.(c)}
                >
                    ✅ Attiva
                </button>
            );
        }

        if (c.status === "active") {
            return (
                <button
                    style={buttonStyle("red")}
                    onClick={() => onDeactivate?.(c)}
                >
                    ⛔ Disattiva
                </button>
            );
        }

        // disabled
        return (
            <button
                style={{
                    ...buttonStyle("gray"),
                    cursor: "not-allowed",
                    opacity: 0.5
                }}
                disabled
            >
                🚫 Disabilitato
            </button>
        );
    }

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "20px",
                marginTop: "20px",
            }}
        >
            {customers.map((c) => (
                <div
                    key={c.id}
                    style={{
                        background: getStatusColor(c.status),
                        border: "1px solid #ddd",
                        borderRadius: "10px",
                        padding: "18px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                        display: "flex",
                        flexDirection: "column",
                        color: "black",
                    }}
                >
                    <h3 style={{ margin: "0 0 0" }}>{c.name}</h3>

                    <div style={{ marginBottom: "25px", fontSize: "10px", opacity: 0.7 }}>
                        <strong>ID:</strong> {c.id}
                    </div>

                    <div style={{ marginBottom: 6 }}>
                        <strong>📧 Email:</strong> {c.email}
                    </div>

                    <div style={{ marginBottom: 6 }}>
                        <strong>✆ Telefono:</strong> {c.phone}
                    </div>

                    <div style={{ marginBottom: 6, display: "flex", alignItems: "center" }}>
                        <strong>🔐 Codice:</strong>
                        <span style={{ marginLeft: 6 }}>{c.activationCode}</span>

                        {/* Pulsante rigenera */}
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
                            onClick={() => onRegenerateCode?.(c)}
                        >
                            Rigenera
                        </button>
                    </div>


                    <div style={{ marginBottom: 6 }}>
                        <strong>🔐 Status:</strong> {c.status.toUpperCase()}
                    </div>

                    <hr style={{ margin: "15px 0", opacity: 0.3 }} />

                    {/* ACTION BUTTONS */}
                    <div style={{ display: "flex", gap: "10px" }}>
                        {getStatusButton(c)}

                        <button
                            style={buttonStyle("orange")}
                            onClick={() => onEdit?.(c)}
                        >
                            ✏️ Modifica
                        </button>

                        <button
                            style={buttonStyle("red")}
                            onClick={() => onDelete?.(c)}
                        >
                            🗑 Elimina
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

function buttonStyle(color: string): React.CSSProperties {
    return {
        flex: 1,
        padding: "8px 5px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        color: "white",
        fontWeight: "bold",
        background:
            color === "blue"
                ? "#007bff"
                : color === "orange"
                    ? "#fd7e14"
                    : color === "green"
                        ? "#28a745"
                        : color === "gray"
                            ? "#6c757d"
                            : "#dc3545", // default red
    };
}
