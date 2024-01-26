import { useState } from 'react'
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
    const [Fname, setFName] = useState('');
    const [Lname, setLName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [confirmPassword , setConfirmPassword] = useState('');
    const { signup, error, isLoading} = useSignup()

    const handelSubmit = async (e) =>{
        e.preventDefault()
        await signup(Fname, Lname, phoneNumber, email, password, confirmPassword)
    }

    return (
    <form className='signup' onSubmit={handelSubmit}>
        <h3>Sign up</h3>

        <label>First Name:</label>
        <input type='text' onChange={(e) => setFName(e.target.value)} value={Fname}/>

        <label>Last Name:</label>
        <input type='text' onChange={(e) => setLName(e.target.value)} value={Lname}/>

        <label>phoneNumber:</label>
        <input type='text' onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber}/>

        <label>Email address:</label>
        <input type='email' onChange={(e) => setEmail(e.target.value)} value={email}/>

        <label>Password:</label>
        <input type='password' onChange={(e) => setPassword(e.target.value)} value={password}/>

        <label>Confirm Password:</label>
        <input type='password' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}/>

        <button disabled={isLoading}>Sign Up</button>
        {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default Signup