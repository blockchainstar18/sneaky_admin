import { useState, useEffect } from 'react'
import axios from "axios";

const Config = () => {
    const [Msgs, setMsgs] = useState([])
    const [newMsg, setNewmsg] = useState('')
    const submitMsg = () => {
        axios.post('http://devsun.go.ro:3000/msgs', {
            Msgs: newMsg
        }).then(() =>
            window.location.reload()
        )
    }
    const deleteMsg = (Msgs) => {
        axios.patch('http://devsun.go.ro:3000/msgs', {
            Msgs: Msgs
        }).then(() =>
            window.location.reload()
        )
    }


    useEffect(() => {
        getCurrMsg();
    }, []);

    const getCurrMsg = async () => {
        const response = await axios.get('http://devsun.go.ro:3000/msgs')
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
        </div>
    )
}

export default Config