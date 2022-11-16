import { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { setStream } from '../globalcomponents/supplyslice';
import { useSelector } from 'react-redux'


const AccountList = () => {
    const [accounts, setAccount] = useState([]);
    const [activeAcc, setActiveAcc] = useState([])
    const [badAcc, setBadAcc] = useState([])
    const [streaming, setStreaming] = useState('Disneyplus')
    const stream = useSelector(state => state.supply.value)

    const dispatch = useDispatch()

    useEffect(() => {
        console.log(stream)

        getAccounts(stream);
    }, []);

    const getAccounts = async (streaming) => {
        const response = await axios.get(`http://localhost:5000/stream/${streaming}`);

        console.log(response)
        setAccount(response.data);


        setActiveAcc(response.data.filter(function (user) {
            return user.flag == 1
        }))
        setBadAcc(response.data.filter(function (user) {
            return user.flag == 0
        }))

    }

    const deleteAccount = async (id) => {
        await axios.delete(`http://localhost:5000/stream/${stream}/${id}`);
        getAccounts(stream);
    }

    return (
        <div>
            <div className="select">
                <select onChange={async (e) => {
                    setStreaming(e.target.value)
                    dispatch(setStream(e.target.value))
                    await getAccounts(e.target.value)
                }} defaultValue={stream}>
                    <option>Disneyplus</option>
                    <option>Netflix</option>
                    <option>HBOMax</option>
                    <option>Crunchyroll</option>
                    <option>Dazn</option>
                </select>
            </div>
            {/* <br /> */}
            <Link to="/supply/add" className="button is-primary mb-6 ml-6">Add New Accounts</Link>
            <div className='columns'>
                <div className='column is-half'>
                    <div className='subtitle has-text-primary'>Active accounts</div>

                    <table className="table is-bordered is-striped is-hoverable is-fullwidth is-narrow">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>email</th>
                                {/* {
                                    stream == 'Netflix' ? (<div></div>) : (<th>password</th>)
                                } */}

                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activeAcc.map((account, index) => (
                                <tr key={account.email}>
                                    <td>{index + 1}</td>
                                    <td>{account.email}</td>
                                    {/* {stream == 'Netflix' ? (<div></div>) : (<td>{account.password}</td>)} */}

                                    <td>
                                        <Link to={`/supply/edit/${account.email}`} >Edit</Link>
                                        <div onClick={() => deleteAccount(account.email)} className="has-text-danger" style={{ "cursor": "pointer" }}>Delete</div>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
                <div className='column is-half'>
                    <div className='subtitle has-text-danger'>Bad accounts</div>

                    <table className="table is-bordered is-striped is-hoverable is-narrow">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>email</th>
                                <th>password</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {badAcc.map((account, index) => (
                                <tr key={account.email}>
                                    <td>{index + 1}</td>
                                    <td>{account.email}</td>
                                    <td>{account.password}</td>
                                    <td>
                                        <Link to={`/supply/edit/${account.email}`} >Edit</Link>
                                        <div onClick={() => deleteAccount(account.email)} className="has-text-danger" style={{ "cursor": "pointer" }}>Delete</div>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AccountList