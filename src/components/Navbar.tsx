import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav>
            <Link to="/" style={{ fontWeight: "bold" }}>🏠 Home</Link>
            <Link to="/trainers">👤 Trainers</Link>
        </nav>
    );
}
