import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; // Redux Provider import
import store from "./store/store"; // Redux store import
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </QueryClientProvider>
);
