import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from "../Firebase/firebase.config";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
    const auth = getAuth()
    const googleProvider = new GoogleAuthProvider();
    const navigate = useNavigate()
    localStorage.clear()

    const { register, handleSubmit } = useForm()

    // Login using google
    const handleGoogleAuth = () => {
        signInWithPopup(auth, googleProvider).then((result) => {
            const user = result.user

            user ? navigate('/sign-up', {
                state: {
                    data: {
                        displayName: user?.displayName,
                        email: user?.email,
                        profile: user?.photoURL,
                    }
                }
            }) : alert('Something went wrong try again!')
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }

    // Simple Login
    const handleLogin = async (data) => {
        await fetch('https://job-portal-u10r.onrender.com/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(result => {
            if (result.email === data.email && result.password === data.password) {
                localStorage.setItem('user', JSON.stringify(result))
                alert('Login Successful')
                setTimeout(navigate('/'), 3000)
            } else alert(result.message)
        }).catch(err => console.warn(err))
    }

    return (
        <section className="flex flex-col md:flex-row h-screen items-center">

            <a href="/" className='absolute top-4 right-4 flex items-center gap-2 text-2xl text-black'>
                <svg xmlns='http://www.w3.org/2000/svg' width={29} height={30} viewBox='0 0 29 30' fill='none'>
                    <circle cx={12.0143} cy={12.5143} r={12.0143} fill='#3565e2' fillOpacity={0.4} />
                    <circle cx={16.9857} cy={17.4857} r={12.0143} fill='#3565e2' />
                </svg>
                <span>JobPortal</span>
            </a>

            <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
                <img src="https://source.unsplash.com/random" alt="" className="w-full h-full object-cover" />
            </div>

            <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center">

                <div className="w-full h-100">


                    <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">Log in to your account</h1>

                    <form className="mt-6" onSubmit={handleSubmit(handleLogin)}>
                        <div>
                            <label htmlFor="email" className="block text-gray-700">Email Address</label>
                            <input type="email" name="email" id="email" {...register('email')} placeholder="Enter Email Address" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autoFocus autoComplete='true' required />
                            {/* <p className="text-red-500 text-xs italic mt-1">{errors.email?.message}</p> */}
                        </div>

                        <div className="mt-4">
                            <label htmlFor="password" className="block text-gray-700">Password</label>
                            <input type="password" name="password" id="password" {...register('password')} placeholder="Enter Password" minLength="6" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" required />
                            {/* <p className="text-red-500 text-xs italic mt-1">{errors.password?.message}</p> */}
                        </div>

                        <div className="text-right mt-2">
                            <a href="#" className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">Forgot Password?</a>
                        </div>

                        <input type="submit" className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6" value={'Login'} />
                    </form>

                    <hr className="my-6 border-gray-300 w-full" />

                    <button type="button" className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300" onClick={handleGoogleAuth}>
                        <div className="flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="w-6 h-6" viewBox="0 0 48 48"><defs><path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" /></defs><clipPath id="b"><use xlinkHref="#a" overflow="visible" /></clipPath><path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" /><path clipPath="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" /><path clipPath="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" /><path clipPath="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" /></svg>
                            <span className="ml-4">Log in with Google</span>
                        </div>
                    </button>

                    <p className="mt-8">Need an account? <Link to={'/sign-up'} className="text-blue-500 hover:text-blue-700 font-semibold">Create an
                        account</Link></p>


                </div>
            </div>

        </section>
    )
}

export default Login