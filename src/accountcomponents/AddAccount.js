import { startTransition, useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'


const AddAccount = () => {
    const [email, setTitle] = useState('');
    const [password, setPrice] = useState('');
    const [inputtxt, setInputtxt] = useState('')
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [num, setNum] = useState(0)
    const [progress, setProgress] = useState(0)
    let credentialArray = []
    let netflix_Email = []
    let netflix_NetflixId = []
    let netflix_SecureNetflixId = []
    const stream = useSelector(state => state.supply.value)

    const preProcess = async () => {
        const stringArray = inputtxt.split(/\s+/)

        if (stream == 'Netflix') {
            stringArray.forEach((st, index) => {
                if (st == 'Email:') {
                    netflix_Email.push(stringArray[index + 1])
                }
                if (st == 'NetflixId') {
                    netflix_NetflixId.push(stringArray[index + 1])
                }
                if (st == 'SecureNetflixId') {
                    netflix_SecureNetflixId.push(stringArray[index + 1])
                }
            })

            netflix_Email.forEach((email, index) => {
                const netflix = {
                    email: email,
                    NetflixId: netflix_NetflixId[index],
                    SecureNetflixId: netflix_SecureNetflixId[index]
                }
                credentialArray.push(netflix)
            })
        }

        else {
            stringArray.forEach((st) => {
                if (st.includes('@')) {
                    const email_pass = {
                        email: st.split(':')[0],
                        password: st.split(':')[1]
                    }
                    credentialArray.push(email_pass)
                }

            })
        }


        setNum(credentialArray.length)
        setInputtxt(JSON.stringify(credentialArray))


    }

    const setCredentials = async () => {

        if (credentialArray.length == 0) {
            setIsLoading(false)
            return
        }

        console.log(credentialArray.length)
        const temp = credentialArray.pop()


        if (stream == 'Netflix') {
            await axios.post(`http://5.15.152.9:5000/stream/${stream}`, {
                email: temp.email,
                NetflixId: temp.NetflixId,
                SecureNetflixId: temp.SecureNetflixId
            }).then(() => {
                setProgress(num - credentialArray.length)
                setCredentials()
            }
            )
        }
        else {
            await axios.post(`http://5.15.152.9:5000/stream/${stream}`, {
                email: temp.email,
                password: temp.password
            }).then(() => {
                setProgress(num - credentialArray.length)
                setCredentials()
            }
            )
        }

    }

    const fileload = (file) => {
        var fr = new FileReader();
        fr.onload = function () {

            setInputtxt(fr.result)
        }

        fr.readAsText(file);
    }

    return (
        <div>
            <div>
                <div class="file is-primary mb-3">
                    <label class="file-label">
                        <input class="file-input" type="file" name="resume" onChange={(e) => fileload(e.target.files[0])} />
                        <span class="file-cta">
                            <span class="file-label">
                                Choose a txt file…
                            </span>
                        </span>
                    </label>
                </div>
                <textarea className="textarea mb-3" value={inputtxt} onChange={(e) => setInputtxt(e.target.value)} style={{ "height": "400px" }}></textarea>
                <div className='is-flex'>
                    <div className="field mt-3 m-auto">
                        <button className="button is-primary" onClick={() => { preProcess() }}>Process</button>
                    </div>
                    <div className="field mt-3 m-auto">

                        <button className="button is-primary" onClick={() => {
                            setIsLoading(true);
                            credentialArray = JSON.parse(inputtxt);
                            setCredentials();
                        }}>Import</button>
                    </div>
                    <div className="field mt-3 m-auto">{num}/{progress}</div>

                </div>

                {
                    isLoading ? (<progress class="progress is-small is-primary mt-3" max="100">15%</progress>) : (<div />)
                }

            </div>
        </div>
    )
}

export default AddAccount