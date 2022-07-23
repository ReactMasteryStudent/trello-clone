import "./App.css";
import { Header } from './components/Header';
import { Route, Redirect } from "react-router-dom";
import Index from "./pages/index/Index";
import TabDetail from "./pages/tab-detail/TabDetail";

function App() {
  return (
    <>
      <Header />
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
    )
  }

export default App;
