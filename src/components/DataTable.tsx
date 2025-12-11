type DataTableProps<T> = {
    data: T[];
    columns?: Array<keyof T>;
    onRowClick?: (row: T) => void;
};

export default function DataTable<T extends object>({ data, columns, onRowClick }: DataTableProps<T>) {
    if (!data || data.length === 0) return <p>No data available</p>;

    const keys = columns ?? (Object.keys(data[0]) as Array<keyof T>);

    return (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 20 }}>
            <thead>
            <tr>
                {keys.map((k) => (
                    <th key={String(k)} style={{ padding: 8, borderBottom: "1px solid #ccc" }}>
                        {String(k)}
                    </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((row, i) => (
                <tr key={i}>
                    {keys.map((k) => (
                        <td key={String(k)} style={{ padding: 8, borderBottom: "1px solid #eee" }}>
                            {String(row[k])}
                        </td>
                    ))}

                    {onRowClick && (
                        <td>
                            <button onClick={() => onRowClick(row)}>Apri</button>
                        </td>
                    )}
                </tr>
            ))}
            </tbody>
        </table>
    );
}
