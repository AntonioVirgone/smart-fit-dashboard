import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import { ViteConfig } from "../config";
import {useParams} from "react-router-dom";
import type {Customer} from "../types/Customer.ts";

export default function CustomersPage() {
    const { trainerId } = useParams<{ trainerId: string }>();

    const [data, setData] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!trainerId) {
            setError("TrainerId mancante nell'URL");
            return;
        }

        const fetchCustomers = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await fetch(
                    `${ViteConfig.API_BASE_URL}/customers/${trainerId}`
                );

                if (!res.ok) {
                    throw new Error(`Errore HTTP: ${res.status}`);
                }

                const json: Customer[] = await res.json();
                setData(json);
            } catch (err: any) {
                setError(err.message ?? "Errore sconosciuto");
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, [trainerId]);

    return (
        <div style={{ padding: 20 }}>
            <h1>Customers del Trainer</h1>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {loading && <p>Caricamento...</p>}

            {!loading && data.length === 0 && !error && (
                <p>Nessun customer trovato per questo trainer.</p>
            )}

            {!loading && data.length > 0 && (
                <DataTable<Customer>
                    data={data}
                    columns={["id", "firstname", "lastname", "email"]} // <-- colonne che vuoi mostrare
                />
            )}
        </div>
    );
}
