import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import AppContextProvider from "./context/AppContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <HelmetProvider>
      <BrowserRouter>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
