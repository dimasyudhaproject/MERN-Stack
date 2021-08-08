import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

function Register() {
    const [user, setUser] = useState({
        firstname:'', lastname:'', id:'', username:'', password: '', email:'', phone:''
    })

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const registerSubmit = async e =>{
        e.preventDefault()
        try {
            await axios.post('/user/register', {...user})

            localStorage.setItem('firstLogin', true)

            
            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="login-page">
            <form onSubmit={registerSubmit}>
                <h2>WELCOME TO PROSEHAT REGISTER PAGE</h2>
                <input type="text" name="firstname" required
                placeholder="First Name" value={user.firstname} onChange={onChangeInput} />

                <input type="text" name="lastname"
                placeholder="Last Name" value={user.lastname} onChange={onChangeInput} />

                <input type="number" name="id"
                placeholder="ID" value={user.id} onChange={onChangeInput} />

                <input type="text" name="username" required
                placeholder="Username" value={user.username} onChange={onChangeInput} />

                <input type="password" name="password" required autoComplete="on"
                placeholder="Password" value={user.password} onChange={onChangeInput} />

                <input type="email" name="email"
                placeholder="Email Address" value={user.email} onChange={onChangeInput} />

                <input type="text" name="phone"
                placeholder="Phone Number" value={user.phone} onChange={onChangeInput} />

                <div className="row">
                    <button type="submit">SIGN UP</button>
                    <Link to="/login">SIGN IN</Link>
                </div>
            </form>
        </div>
    )
}

export default Register