import { useState } from "react";
import axios from "axios";

type Props = {
    onResponse: (res: any) => void;
    onLoading: (value: boolean) => void;
};

export default function RequestForm({ onResponse, onLoading }: Props) {
    const [method, setMethod] = useState("GET");
    const [url, setUrl] = useState("");
    const [body, setBody] = useState("{}");

    const sendRequest = async () => {
        onLoading(true);

        try {
            const jsonBody = body ? JSON.parse(body) : undefined;

            const res = await axios({
                method,
                url,
                data: jsonBody,
            });

            onResponse({
                status: res.status,
                headers: res.headers,
                data: res.data,
            });
        } catch (error: any) {
            onResponse({
                status: error.response?.status ?? "NETWORK ERROR",
                data: error.response?.data ?? error.message,
            });
        } finally {
            onLoading(false);
        }
    };

    return (
        <div style={{ marginBottom: "20px" }}>
            <div>
                <label>Method:</label>
                <select value={method} onChange={(e) => setMethod(e.target.value)}>
                    <option>GET</option>
                    <option>POST</option>
                    <option>PUT</option>
                    <option>PATCH</option>
                    <option>DELETE</option>
                </select>
            </div>

            <div>
                <label>Endpoint URL:</label>
                <input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    style={{ width: "100%" }}
                    placeholder="https://smart-fit-api.onrender.com/api/customers"
                />
            </div>

            <div>
                <label>JSON Body:</label>
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    style={{ width: "100%", height: "100px" }}
                />
            </div>

            <button onClick={sendRequest}>Send Request</button>
        </div>
    );
}
