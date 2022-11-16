import { Routes, Route } from "react-router-dom";

import AccountList from '../accountcomponents/AccountList'
import AddAccount from '../accountcomponents/AddAccount'
import EditAccount from '../accountcomponents/EditAccount'
import { Provider } from 'react-redux'
import store from "./store";

const Supply = () => {
    return (
        <div>
            <Provider store={store}>
                <Routes>
                    <Route exact index element={<AccountList />} />
                    <Route exact path="add" element={<AddAccount />} />
                    <Route exact path="edit/:id" element={<EditAccount />} />
                </Routes>
            </Provider>
        </div>
    )
}

export default Supply