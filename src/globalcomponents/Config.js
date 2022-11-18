import { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const Config = () => {
    const [Msgs, setMsgs] = useState([])
    const [newMsg, setNewmsg] = useState('')
    const navigate = useNavigate()
    const submitMsg = () => {
        axios.post('http://localhost:3000/msgs', {
            Msgs: newMsg
        }).then(() =>
            window.location.reload()
        )
    }
    const deleteMsg = (Msgs) => {
        axios.patch('http://localhost:3000/msgs', {
            Msgs: Msgs
        }).then(() =>
            window.location.reload()
        )
    }


    useEffect(() => {
        getCurrMsg();
    }, []);

    const getCurrMsg = async () => {
        const response = await axios.get('http://localhost:3000/msgs')
        console.log(response.data)
        setMsgs(response.data)
    }

    return (
        <div>
            <div className="columns">
                <div className="column">
                    <textarea className="textarea mt-6 mb-6" placeholder="e.g. Hello world" onChange={(e) => setNewmsg(e.target.value)}></textarea>
                    <button className="button is-primary mb-6" onClick={() => submitMsg()}>Create</button>
                </div>
                <div className="column">
                    {
                        Msgs.map((msg) => {
                            return (<article className="message is-primary" key={msg.Msgs}>
                                <div className="message-header">
                                    <p>{msg.createdAt}</p>
                                    <button className="delete" aria-label="delete" onClick={() => deleteMsg(msg.Msgs)}></button>
                                </div>
                                <div className="message-body">
                                    {
                                        msg.Msgs
                                    }
                                </div>
                            </article>)

                        })
                    }
                </div>
            </div>







            {/* <form onSubmit={postMsg} className="box" style={{ "height": "500px" }}>

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
            </form> */}

        </div>
    )
}

export default Config