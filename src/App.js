import './App.css';
import Main from './components/MainComponent';
import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-social/bootstrap-social.css';
import {BrowserRouter} from 'react-router-dom';

function App(){
    return (
    
        <BrowserRouter>
            <div>        
                <Main/>
            </div>
        </BrowserRouter>
    );
}

export default App;
