import Router from "./components/Router";
import Layout from "./components/Layout";
import store from "./store/store";
import { Provider } from "react-redux";
import { Suspense } from "react";

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Router />
      </Layout>
    </Provider>
  );
}

export default App;
