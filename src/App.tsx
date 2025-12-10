import Navbar from "./components/Navbar.tsx";
import {Outlet} from "react-router-dom";

export default function App() {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
}
