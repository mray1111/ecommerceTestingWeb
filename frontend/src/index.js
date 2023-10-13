 
import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

const root = createRoot(document.getElementById("root")); // Create a root instance

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);