import {useEffect, useState} from "react";
import {ViteConfig} from "../config.ts";
import type {Trainer} from "../types/Trainer.ts";
import {useNavigate} from "react-router-dom";
import TrainerCardList from "../components/TrainerCardList.tsx";
import CreateTrainerPage from "./CreateTrainerPage.tsx";

export default function TrainersPage() {
    const [data, setData] = useState<Trainer[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const fetchTrainers = async () => {
        setLoading(true);
        setError(null);

        const url = `${ViteConfig.API_BASE_URL}/trainer`;

        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

            const json: Trainer[] = await res.json();
            setData(json);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    // 👇 Fetch automatico al caricamento della pagina
    useEffect(() => {
        fetchTrainers();
    }, []); // dipendenze vuote → eseguito una sola volta

    const goToCustomers = (trainer: Trainer) => {
        navigate(`/trainers/${trainer.id}/customers`);
    };

    console.log(data)

    return (
        <div style={{padding: 20}}>
            <h1>Trainers</h1>

            {error && <p style={{color: "red"}}>{error}</p>}
            {loading && <p>Caricamento...</p>}

            {!loading && data.length === 0 && !error && (
                <p>Nessun customer trovato per questo trainer.</p>
            )}

            {/* --- FLEX CONTAINER --- */}
            <div
                style={{
                    display: "flex",
                    gap: "30px",
                    marginTop: "20px",
                    alignItems: "flex-start",
                }}
            >
                {/* --- COLONNA SINISTRA: FORM --- */}
                <div
                    style={{
                        flex: "1",
                        maxWidth: "350px",
                        padding: "15px",
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                    }}
                >
                    <h2>Crea nuovo Trainer</h2>
                    <CreateTrainerPage onTrainerCreated={fetchTrainers}/>
                </div>

                {/* --- COLONNA DESTRA: LISTA CUSTOMER --- */}
                <div style={{
                    flex: 2,
                    padding: "15px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                }}>
                    <h2>Elenco Trainers</h2>

                    {!loading && data.length > 0 && (
                        <TrainerCardList trainers={data}
                                         onEdit={(c) => console.log("Modifica", c)}
                                         onDelete={(c) => console.log("Elimina", c)}
                                         onCardClick={goToCustomers}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}