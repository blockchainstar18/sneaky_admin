import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./globalcomponents/DashBoard"
import Config from "./globalcomponents/Config";
import Generate from "./globalcomponents/Generate";
import Supply from './globalcomponents/Supply'
import 'bulma/css/bulma.css'

function App() {
  return (
    <div>
      <div className="container">
        <h1 className="title is-2 mt-6 has-text-info">Account Login Extension Admin Panel</h1>
        <div className="tabs is-medium is-fullwidth">
          <ul>
            <li><a href="/">Dashboard</a></li>
            <li><a href="/config">Message</a></li>
            <li><a href="/generate">Generate</a></li>
            <li><a href="/supply">Supply</a></li>
          </ul>
        </div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/config" element={<Config />} />
            <Route path="/generate" element={<Generate />} />
            <Route path="/supply/*" element={<Supply />} />
            {/* <Route exact index element={<AccountList />} />
              <Route exact path="add" element={<AddAccount />} />
              <Route exact path="edit/:id" element={<EditAccount />} />
            </Route> */}
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;