import "./App.css";
import { Header } from './components/Header';
import { Route, Redirect } from "react-router-dom";
import Index from "./pages/index/Index";
import TabDetail from "./pages/tab-detail/TabDetail";
import { ColumnList } from "./components/Column/ColumnList";

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
      <div className="wrapper">
        <ColumnList />
      </div>
    </>
    )
  }

export default App;
