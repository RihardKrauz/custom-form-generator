import React from 'react';
import ConstructorPanel from '../ConstructorPanel';
import { ToastContainer } from 'react-toastify';
import './styles.css';

function App() {
    return (
        <div className="app">
            <ConstructorPanel />
            <ToastContainer />
        </div>
    );
}

export default App;
