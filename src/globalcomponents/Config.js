import { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const Config = () => {
    const [globMsg, setGlobMsg] = useState('')
    const [fulfMsg, setfulfMsg] = useState('')
    const navigate = useNavigate()
    const postMsg = async (e) => {
        e.preventDefault();
        await axios.patch('http://5.15.152.9:3000/msgs', {
            globalMsg: globMsg,
            fulfillMsg: fulfMsg
        });
        navigate("/config");
    }

    useEffect(() => {
        getCurrMsg();
    }, []);

    const getCurrMsg = async () => {
        const response = await axios.get('http://5.15.152.9:3000/msgs')
        setGlobMsg(response.data.globalMsg)
        setfulfMsg(response.data.fulfillMsg)
    }

    return (
        <div>


            <form onSubmit={postMsg} className="box" style={{ "height": "500px" }}>

                <div className="column">
                    <label className="label">Global message</label>

                    <textarea className="textarea" placeholder="Your message will be displayed to the extension"
                        value={globMsg}
                        onChange={(e) => setGlobMsg(e.target.value)}
                    ></textarea>
                </div>
                <div className="column">
                    <label className="label">Fulfilled User message</label>

                    <textarea className="textarea" placeholder="This message is passed to fulfilled users"
                        value={fulfMsg}
                        onChange={(e) => setfulfMsg(e.target.value)}
                    ></textarea>
                </div>
                <button className="button is-primary">Submit</button>
            </form>

        </div>
    )
}

export default Config