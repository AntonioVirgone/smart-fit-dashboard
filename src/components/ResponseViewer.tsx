type Props = {
    response: any;
    loading: boolean;
};

export default function ResponseViewer({ response, loading }: Props) {
    if (loading) return <p>Loading...</p>;

    if (!response) return <p>No response yet.</p>;

    return (
        <div style={{ marginTop: "20px" }}>
            <h3>Response</h3>

            <p><strong>Status:</strong> {response.status}</p>

            <pre style={{
                background: "#f0f0f0",
                padding: "10px",
                borderRadius: "4px"
            }}>
        {JSON.stringify(response.data, null, 2)}
      </pre>
        </div>
    );
}
