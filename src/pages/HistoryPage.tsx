import {useEffect, useState} from "react";
import {ViteConfig} from "../config.ts";
import HistoryCardList from "../components/HistoryCardList.tsx";
import type {History} from "../types/workout/History.ts";

export default function HistoryPage() {
    const [data, setData] = useState<History[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchHistory = async () => {
        setLoading(true);
        setError(null);

        const url = `${ViteConfig.API_BASE_URL}/history-workout`;

        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

            const json: History[] = await res.json();
            setData(json);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchHistory();
    }, []);

    console.log(data);

    return (
        <div style={{padding: 20}}>
            <h1>History</h1>

            {error && <p style={{color: "red"}}>{error}</p>}
            {loading && <p>Caricamento...</p>}

            {!loading && data.length === 0 && !error && (
                <p>Nessun workout trovato.</p>
            )}

            <div
                style={{
                    display: "flex",
                    gap: "30px",
                    marginTop: "20px",
                    alignItems: "flex-start",
                }}
            >
                {!loading && data.length > 0 && (
                    <HistoryCardList histories={data} />
                )}
            </div>
        </div>
    );
}