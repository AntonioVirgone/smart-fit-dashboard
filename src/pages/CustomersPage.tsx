import {useCallback, useEffect, useState} from "react";
import {ViteConfig} from "../config";
import {useParams} from "react-router-dom";
import type {Customer} from "../types/Customer.ts";
import CreateCustomerPage from "./CreateCustomerPage.tsx";
import CustomerCardList from "../components/CustomerCardList.tsx";

export default function CustomersPage() {
    const {trainerId} = useParams<{ trainerId: string }>();

    const [data, setData] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchCustomers = useCallback(async () => {
        if (!trainerId) return;

        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${ViteConfig.API_BASE_URL}/trainer/${trainerId}/customers`);

            if (!res.ok) throw new Error(`Errore HTTP: ${res.status}`);

            const json: Customer[] = await res.json();
            setData(json);

        } catch (err: any) {
            setError(err.message ?? "Errore sconosciuto");
        } finally {
            setLoading(false);
        }
    }, [trainerId]);

    const activateCustomer = async (c: Customer) => {
        try {
            const res = await fetch(`${ViteConfig.API_BASE_URL}/customers/activate`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "true"
                },
                body: JSON.stringify({
                    email: c.email,
                    activationCode: c.activationCode
                })
            });

            if (!res.ok) {
                throw new Error("Errore durante l'attivazione");
            }

            await fetchCustomers(); // aggiorna lista
        } catch (err) {
            console.error(err);
        }
    };

    const deactivateCustomer = async (c: Customer) => {
        try {
            const res = await fetch(`${ViteConfig.API_BASE_URL}/trainer/${trainerId}/customer/${c.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "true"
                },
            });

            if (!res.ok) {
                throw new Error("Errore durante l'attivazione");
            }

            await fetchCustomers();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, [fetchCustomers]);

    const regenerateCode = async (c: Customer) => {
        const res = await fetch(`${ViteConfig.API_BASE_URL}/trainer/${trainerId}/customer/${c.id}/regenerate-code`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true",
            },
        });

        if (res.ok) {
            await fetchCustomers(); // aggiorna la lista
        }
    };

    return (
        <div style={{padding: 20}}>
            <h1>Customers del Trainer</h1>

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
                    <h2>Crea nuovo Customer</h2>
                    <CreateCustomerPage onCustomerCreated={fetchCustomers} />
                </div>

                {/* --- COLONNA DESTRA: LISTA CUSTOMER --- */}
                <div style={{ flex: 2,
                    padding: "15px",
                    border: "1px solid #ddd",
                    borderRadius: "6px", }}>
                    <h2>Elenco Customers</h2>

                    {!loading && data.length > 0 && (
                        <CustomerCardList customers={data}
                                          onActivate={activateCustomer}
                                          onDeactivate={deactivateCustomer}
                                          onEdit={(c) => console.log("Modifica", c)}
                                          onDelete={(c) => console.log("Elimina", c)}
                                          onRegenerateCode={regenerateCode}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
