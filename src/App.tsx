import Router from "./components/Router";
import Layout from "./components/Layout";
import store from "./store/store";
import { Provider } from "react-redux";
import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
