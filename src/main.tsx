import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import CustomersPage from "./pages/CustomersPage.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TrainersPage from "./pages/TrainersPage.tsx";
import CreateTrainerPage from "./pages/CreateTrainerPage.tsx";
import CreateCustomerPage from "./pages/CreateCustomerPage.tsx";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<h2>Benvenuto nella Dashboard SmartFit</h2>} />
                <Route path="trainers" element={<TrainersPage />} />
                <Route path="trainers/:trainerId/customers" element={<CustomersPage />} />
                <Route path="trainer/create" element={<CreateTrainerPage />} />
                <Route path="customer/create" element={<CreateCustomerPage />} />
            </Route>
        </Routes>
    </BrowserRouter>
)
