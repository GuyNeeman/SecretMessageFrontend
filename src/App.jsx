import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import ShowMessage from "./Components/ShowMessage.jsx";
import CreateMessage from "./Components/CreateMessage.jsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<CreateMessage />} />
                    <Route path="/show/:uuid" element={<ShowMessage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
