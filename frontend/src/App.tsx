import React from 'react';
import './assets/css/App.css';
import AppHeader from "./components/AppHeader";
import InventoriesTable from "./components/InventoriesTable";

function App() {
    return (
        <div className="App">
            <AppHeader/>
            <InventoriesTable/>
        </div>
    );
}

export default App;
