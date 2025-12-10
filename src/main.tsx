import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import CustomersPage from "./pages/CustomersPage.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TrainersPage from "./pages/TrainersPage.tsx";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<h2>Benvenuto nella Dashboard SmartFit</h2>} />
                <Route path="trainers" element={<TrainersPage />} />
                <Route path="trainers/:trainerId/customers" element={<CustomersPage />} />
            </Route>
        </Routes>
    </BrowserRouter>
)
