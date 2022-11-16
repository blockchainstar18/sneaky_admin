import { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Generate = () => {
    const [numAccs, setNumAccs] = useState(10)
    const [numReps, setNumRep] = useState(30)
    const [accounts, setAccount] = useState([])
    // const navigate = useNavigate()
    useEffect(() => {
        getAccounts();
    }, []);
    const generateAccs = () => {
        // e.preventDefault();
        axios.post('http://3.141.40.201:3000/exaccs', {
            numberOfAccounts: numAccs,
            numberOfReplacements: numReps
        }).then((res) => {
            window.location.reload()

        });
    }
    const getAccounts = async () => {
        const response = await axios.get('http://3.141.40.201:3000/exaccs');

        setAccount(response.data);
    }

    return (
        <div className='columns'>
            <div className='column is-one-quarter box'>

                <div className="field">
                    <label className="label">Replacements</label>
                    <div className="control">
                        <input className="input" type="text"
                            // value={numReps}
                            onChange={(e) => setNumRep(parseInt(e.target.value))}
                            placeholder="Number of Replacements" />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Number of Accounts</label>
                    <div className="control">
                        <input className="input" type="text"
                            // value={numAccs}
                            onChange={(e) => setNumAccs(parseInt(e.target.value))}
                            placeholder="Number of Accounts" />
                    </div>
                </div>
                <button className="button is-primary" onClick={() => {
                    generateAccs();

                }}>Generate</button>

            </div>
            <div className='column box'>
                <label className="label">Available Accounts</label>
                <table className="table is-bordered is-fullwidth">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Replacements</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map((account, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{account.user}</td>
                                <td>{account.password}</td>
                                <td>{account.id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Generate