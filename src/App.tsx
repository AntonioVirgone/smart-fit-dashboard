import { useState } from "react";
import RequestForm from "./components/RequestForm";
import ResponseViewer from "./components/ResponseViewer";

export default function App() {
    const [response, setResponse] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
            <h1>SmartFit API Dashboard</h1>

            <RequestForm
                onResponse={setResponse}
                onLoading={setLoading}
            />

            <ResponseViewer response={response} loading={loading} />
        </div>
    );
}
