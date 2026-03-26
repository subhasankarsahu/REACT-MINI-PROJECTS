import React, {useState, useContext} from 'react'
import UserContext from '../context/userContext'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState("")

    const { setUser } = useContext(UserContext)


    const handleSubmit = (e) => {
        e.preventDefault()
        setUser({ username, password })
    }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input type="text" placeholder='username' value={username} onChange={(e) => {
        setUsername(e.target.value)
      }}/>
      {" "}
      <input type="password" placeholder='password' value={password} onChange={(e) => {
        setPassword(e.target.value)
      }}/>
      <button type="submit">Submit</button>
    </form>
  )
}

export default Login
