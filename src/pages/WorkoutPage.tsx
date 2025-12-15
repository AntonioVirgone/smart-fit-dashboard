import {useEffect, useState} from "react";
import {ViteConfig} from "../config.ts";
//import {useNavigate} from "react-router-dom";
import CreateTrainerPage from "./CreateTrainerPage.tsx";
import type {Workout} from "../types/workout/Workout.ts";
import WorkoutCardList from "../components/WorkoutCardList.tsx";

export default function WorkoutPage() {
    const [data, setData] = useState<Workout[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    //const navigate = useNavigate();

    const fetchWorkouts = async () => {
        setLoading(true);
        setError(null);

        const url = `${ViteConfig.API_BASE_URL}/workout`;

        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

            const json: Workout[] = await res.json();
            setData(json);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    // 👇 Fetch automatico al caricamento della pagina
    useEffect(() => {
        fetchWorkouts();
    }, []); // dipendenze vuote → eseguito una sola volta

    console.log(data)

    return (
        <div style={{padding: 20}}>
            <h1>Workouts</h1>

            {error && <p style={{color: "red"}}>{error}</p>}
            {loading && <p>Caricamento...</p>}

            {!loading && data.length === 0 && !error && (
                <p>Nessun workout trovato.</p>
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
                    <h2>Crea nuovo Workout</h2>
                    <CreateTrainerPage onTrainerCreated={fetchWorkouts}/>
                </div>

                {/* --- COLONNA DESTRA: LISTA CUSTOMER --- */}
                <div style={{
                    flex: 2,
                    padding: "15px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                }}>
                    <h2>Elenco Workout</h2>

                    {!loading && data.length > 0 && (
                        <WorkoutCardList workouts={data} />
                    )}
                </div>
            </div>
        </div>
    );
}