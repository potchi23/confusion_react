import './App.css';
import Main from './components/MainComponent';
import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-social/bootstrap-social.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore'; 

const store = ConfigureStore();

function App(){

    return (
        <Provider store={store}>        
            <BrowserRouter>
                <div>        
                    <Main/>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
