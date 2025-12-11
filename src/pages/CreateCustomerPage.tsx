import { useState } from "react";
import { ViteConfig } from "../config";
import {useParams} from "react-router-dom";

type Props = {
    onCustomerCreated?: () => void;
};

export default function CreateCustomerPage({ onCustomerCreated }: Props) {
    const { trainerId } = useParams<{ trainerId: string }>();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!trainerId) {
            setMessage("Devi inserire il trainerId");
            return;
        }

        setLoading(true);
        setMessage(null);

        const API_URL = `${ViteConfig.API_BASE_URL}/trainer/${trainerId}/customers`;

        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, phoneNumber }),
            });

            if (!res.ok) throw new Error("Errore nella creazione del customer");

            const data = await res.json();
            setMessage(`Customer creato! ID: ${data.id}, Codice attivazione: ${data.activationCode}`);

            // reset form
            setName("");
            setEmail("");
            setPhoneNumber("");

            if (onCustomerCreated) {
                onCustomerCreated(); // aggiorna la lista nel parent
            }
        } catch (err: any) {
            setMessage(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", maxWidth: 400 }}>
                <label>Nome atleta:</label>
                <input value={name} onChange={(e) => setName(e.target.value)} required />

                <label>Email:</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} required />

                <label>Telefono:</label>
                <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />

                <button type="submit" disabled={loading} style={{ marginTop: 10 }}>
                    {loading ? "Creazione..." : "Crea Customer"}
                </button>
            </form>

            {message && <p style={{ marginTop: 20 }}>{message}</p>}
        </div>
    );
}
