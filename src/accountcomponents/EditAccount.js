/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'

const EditAccount = () => {
    const [email, setTitle] = useState('');
    const [password, setPrice] = useState('');
    const [NetflixId, setNetflixId] = useState('')
    const [SecureNetflixId, setSecureNetflixId] = useState('')
    const navigate = useNavigate();
    const { id } = useParams();
    const stream = useSelector(state => state.supply.value)

    const updateAccount = async (e) => {

        e.preventDefault();

        if (stream == 'Netflix') {
            await axios.patch(`http://5.15.152.9:3000/stream/${stream}/${id}`, {
                email: email,
                NetflixId: NetflixId,
                SecureNetflixId: SecureNetflixId
            });
        }
        else
            await axios.patch(`http://5.15.152.9:3000/stream/${stream}/${id}`, {
                email: email,
                password: password
            });
        navigate("/supply");
    }

    useEffect(() => {
        getAccountById();
    }, []);

    const getAccountById = async () => {
        console.log(id)
        const response = await axios.get(`http://5.15.152.9:3000/stream/${stream}/${id}`);
        setTitle(response.data.email);
        if (stream == 'Netflix') {
            setNetflixId(response.data.NetflixId)
            setSecureNetflixId(response.data.SecureNetflixId)
        }
        else
            setPrice(response.data.password);

    }

    return (
        <div>
            <form onSubmit={updateAccount}>
                <div className="field">
                    <label className="label">Email</label>
                    <input
                        className="input"
                        type="email"
                        placeholder="Password"
                        value={email}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>


                {
                    stream == 'Netflix' ? (<div>
                        <div className="field">
                            <label className="label">NetflixId</label>
                            <input
                                className="input"
                                type="text"
                                placeholder="NetflixId"
                                value={NetflixId}
                                onChange={(e) => setNetflixId(e.target.value)}
                            />
                        </div>
                        <div className="field">
                            <label className="label">SecureNetflixId</label>
                            <input
                                className="input"
                                type="text"
                                placeholder="SecureNetflixId"
                                value={SecureNetflixId}
                                onChange={(e) => setSecureNetflixId(e.target.value)}
                            />
                        </div></div>
                    ) : (
                        <div className="field">
                            <label className="label">Password</label>
                            <input
                                className="input"
                                type="text"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                    )
                }


                <div className="field">
                    <button className="button is-primary">Update</button>
                </div>
            </form >
        </div >
    )
}

export default EditAccount