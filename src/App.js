import "./App.css";
import WorkSpace from "./components/work-space/WorkSpace";
import { Route, Redirect } from "react-router-dom";
import Index from "./pages/index/Index";
import TabDetail from "./pages/tab-detail/TabDetail";

function App() {
  return (
    <>
      <header></header>
      <main>
        <Route path="/" exact>
          <Redirect to="/index" />
        </Route>
        <Route path="/index">
          <Index />
        </Route>
        <Route path={"/:tabId/:tabName"}>
          <TabDetail />
        </Route>
      </main>
    </>
  );
}

export default App;
