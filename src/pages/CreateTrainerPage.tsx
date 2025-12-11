import { useState } from "react";
import { ViteConfig } from "../config";

export default function CreateTrainerPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const API_URL = `${ViteConfig.API_BASE_URL}/trainer`;

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            if (!res.ok) throw new Error("Errore durante la creazione del trainer");

            const data = await res.json();
            setMessage(`Trainer creato con successo! ID: ${data.id}`);

            // reset form
            setName("");
            setEmail("");
            setPassword("");

        } catch (err: any) {
            setMessage(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>Crea nuovo Trainer</h1>

            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", maxWidth: 400 }}>
                <label>Nome:</label>
                <input value={name} onChange={(e) => setName(e.target.value)} required />

                <label>Email:</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} required />

                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" disabled={loading} style={{ marginTop: 10 }}>
                    {loading ? "Creazione..." : "Crea Trainer"}
                </button>
            </form>

            {message && <p style={{ marginTop: 20 }}>{message}</p>}
        </div>
    );
}
