import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";

import App from "./App.jsx";
import "./index.css";
import store from "./Redux/store.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SnackbarProvider
      autoHideDuration={1000}
      hideIconVariant
      maxSnack={3}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </SnackbarProvider>
  </StrictMode>
);
