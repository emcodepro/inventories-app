import React from 'react';
import './assets/css/App.css';
import AppHeader from "./components/AppHeader";
import InventoriesTable from "./components/InventoriesTable";
import { Routes, Route } from 'react-router-dom';
import NewInventoryForm from "./components/NewInventoryForm";

function App() {
    return (
        <div className="App">
            <AppHeader/>
            <Routes>
                <Route path="/" element={<InventoriesTable />}/>
                <Route path="/new" element={<NewInventoryForm />}/>
            </Routes>
        </div>
    );
}

export default App;
