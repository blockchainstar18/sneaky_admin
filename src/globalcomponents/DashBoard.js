import axios from "axios"
import { useState, useEffect } from "react"



const DashBoard = () => {
    const [users, setUsers] = useState([])
    const [activeusers, setActiveUsers] = useState([])
    const [standbyusers, setStandByUsers] = useState([])
    const [fulfilledusers, setFulfilledUsers] = useState([])
    const getUsers = async () => {
        const Users = await (await axios.get('http://devsun.go.ro:3000/exaccs/users')).data
        setUsers(Users)
        setActiveUsers(Users)
        setActiveUsers(Users.filter(function (user) {
            if (user.startedAt != null) {
                const today = new Date()
                const startday = new Date(user.startedAt)
                const diffTime = Math.abs(today - startday);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays < 30
            }
            return false

        }))

        setStandByUsers(Users.filter(function (user) {
            return user.startedAt == null
        }))
        setFulfilledUsers(Users.filter(function (user) {
            if (user.startedAt != null) {
                const today = new Date()
                const startday = new Date(user.startedAt)
                const diffTime = Math.abs(today - startday);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays >= 30
            }
            return false
        }))
    }

    useEffect(() => {
        getUsers()
    }, []);



    return (
        <div className="columns">
            <div className="column is-half">
                <div className="mt-6">
                    <h2 className="subtitle has-text-primary">ActiveUsers</h2>
                    <table className="table is-bordered is-medium">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Ip</th>
                                <th>Started At</th>
                                {/* <th>Remaining Day</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {activeusers.map((user, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.user}</td>
                                    <td>{user.startedAt}</td>
                                    {/* <td>{30 - user.Days}</td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="column">

                <div className="mt-6" >
                    <h2 className="subtitle has-text-warning">StandByUsers</h2>
                    <table className="table is-bordered is-medium">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Ip</th>
                                {/* <th>Replacements</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {standbyusers.map((user, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.user}</td>
                                    {/* <td>{user.replacements}</td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="column">

                <div className="mt-6">
                    <h2 className="subtitle has-text-danger">FulfilledUsers</h2>
                    <table className="table is-bordered is-medium">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Ip</th>
                                <th>Started At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fulfilledusers.map((user, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.user}</td>
                                    <td>{user.startedAt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default DashBoard