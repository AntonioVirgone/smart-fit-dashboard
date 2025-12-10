import {useEffect, useState} from "react";
import {ViteConfig} from "../config.ts";
import DataTable from "../components/DataTable.tsx";
import type {Trainer} from "../types/Trainer.ts";
import {useNavigate} from "react-router-dom";

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

    return (
        <div style={{ padding: 20 }}>
            <h1>Trainers</h1>
            {/* Error */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Loading */}
            {loading && <p>Loading...</p>}

            {/* Table */}
            {!loading && data.length > 0 &&
                <DataTable<Trainer>
                    data={data}
                    columns={["id", "name", "password", "email"]}
                    onRowClick={goToCustomers}
                />
            }
        </div>
    );
}