import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react";
import Link from 'next/link'
import { useRouter } from "next/router";


import { auth } from "../backend/firebase/firebase";



const Login = () => {
    const Router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const [name, setName] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const createUser = await auth.createUserWithEmailAndPassword(email, password)
            createUser.user.updateProfile({
                displayName: name
            })
            console.log(createUser)
            Router.push('/login')
            
            
            
        } catch (error) {
           console.log(error)
          
        }

    }
    return (
        <>
           
            <div className="container text-center  my-5 mx-auto w-50 py-2 px-5">
                <h1>Welcome To SignUp Page</h1>
                <form method="POST" onSubmit={handleSubmit} >
                    <div className="row mb-3 mt-4 w-75 m-auto">
                        <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" value={name} id="name" onChange={(e) => {
                                setName(e.target.value);
                            }} />
                        </div>
                    </div>
                    <div className="row mb-3 mt-4 w-75 m-auto">
                        <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" value={email} id="email" onChange={(e) => {
                                setEmail(e.target.value);
                            }} />
                        </div>
                    </div>
                    <div className="row mb-3 w-75 m-auto">
                        <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" value={password} id="password" onChange={(e) => {
                                setpassword(e.target.value)
                            }} />
                        </div>
                    </div>
                    <button className="btn btn-light" type="submit">SignUp</button>
                </form>
                <p>Already have an Account ?<span><Link href="/login"><a> LogIn Page</a></Link> </span></p>
            </div>
        </>
    )
}

export default Login;