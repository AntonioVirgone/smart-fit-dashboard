import type {History} from "../types/workout/History.ts";

type Props = {
    histories: History[];
};

export default function HistoryCardList({ histories }: Props) {
    return (
        <div>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                    gap: "20px",
                    marginTop: "20px",
                }}
            >
                {histories.map((history) => (
                    <div
                        key={history.id}
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
                        <div style={{marginBottom: "25px", fontSize: "10px", opacity: 0.7}}>
                            <strong>ID:</strong> {history.id}
                        </div>

                        <div style={{marginBottom: 6}}>
                            <strong>Type:</strong> {history.type}
                        </div>
                        <div style={{marginBottom: 6}}>
                            <strong>Intensità:</strong> {history.intensity}
                        </div>
                        <div style={{marginBottom: 6}}>
                            <strong>Ripetizioni:</strong> {history.repetitions}
                        </div>
                        <div style={{marginBottom: 6}}>
                            <strong>Peso:</strong> {history.weight}
                        </div>
                        <div style={{marginBottom: 6}}>
                            <strong>Giorno:</strong> {history.createdAt}
                        </div>
                        <div style={{marginBottom: 6}}>
                            <strong>Note:</strong> {history.notes}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
