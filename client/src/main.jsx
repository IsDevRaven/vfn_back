import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {ChakraProvider} from '@chakra-ui/react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AuthProvider} from "./components/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
        <ChakraProvider>
            <AuthProvider>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </AuthProvider>
        </ChakraProvider>
)
