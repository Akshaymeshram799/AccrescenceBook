import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react";
import { auth , updateProfile,provider} from "../backend/firebase/firebase";
import { useRouter } from "next/router";
import '@fortawesome/free-solid-svg-icons';



const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setpassword] = useState('')
    const Router = useRouter()

    const handleSubmit =async (e)=>{
        
       e.preventDefault();
       try {
        const res = await auth.signInWithEmailAndPassword(email,password)
        Router.push('/')
       } catch (error) {
           console.log(error)
       }
      
    } 

    const loginWithGoogle = async ()=>{
        try {
            
            let res = await auth.signInWithPopup(provider)
            console.log(res);
            Router.push('/')
            
            
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="container text-center  my-5 mx-auto w-50 py-2 px-5">
                <h1>Welcome To Login Page</h1>
                <form method="GET" onSubmit={handleSubmit} >
                    <div className="row mb-3 mt-4 w-75 m-auto">
                        <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" value={email} id="email" onChange={(e)=>{
                               setEmail(e.target.value);
                            }} />
                        </div>
                    </div>
                    <div className="row mb-3 w-75 m-auto">
                        <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" value={password} id="password" onChange={(e)=>{
                                setpassword(e.target.value)
                            }} />
                        </div>
                    </div>
                    <button className="btn btn-light" type="submit">LOGIN</button>
                </form>
               <p className="btn btn-light shadow-sm btn-outline-dark" onClick={loginWithGoogle}><span><img src="Images/google.png" style={{width:"22px"}} /></span> Login with Google</p>
            </div>
        </>
    )
}

export default Login;