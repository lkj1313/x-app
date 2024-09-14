import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; // Redux Provider import
import store from "./store/store"; // Redux store import

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    {" "}
    {/* Redux Provider로 App을 감쌈 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
