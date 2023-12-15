import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const SignUp = () => {
    const [newUser, setNewUser] = useState({
        userName: '',
        email: '',
        profile: '',
        password: '',
    })
    const { state } = useLocation()
    const [image, setImage] = useState({ preview: null, profile: null })

    // Checking Auth Data
    useEffect(() => {
        const data = state?.data
        if (data) {
            setNewUser({
                userName: data?.displayName ? data.displayName : '',
                email: data?.email ? data.email : '',
                profile: data?.profile ? data.profile : '',
                password: '',
            })

            setImage({
                preview: data.profile
            })
        }
    }, [])

    // Image Input handler
    const handleImageChange = e => {
        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                profile: e.target.files[0]
            })
            setNewUser(prev => ({ ...prev, profile: e.target.files[0] }))
        }
    }

    // Input handler
    const handleChange = e => setNewUser(prev => ({ ...prev, [e.target.name]: e.target.value }))

    // Simple Login
    const handleSignup = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', newUser.profile)
        await fetch('https://job-portal-u10r.onrender.com/upload-image', {
            method: 'POST',
            body: formData
        }).then(res => res.json()).then(result => {
            let imageLink = /\.(jpg|jpeg|png|webp|avif|gif|svg|JPG|JPEG|PNG|WEBP|AVIF|GIF|SVG)$/.test(result?.imageUrl)
            if (imageLink) {
                newUser.profile = result.imageUrl
            }
        }).then(() => {
            fetch('https://job-portal-u10r.onrender.com/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            }).then(res => res.json()).then(result => {
                result?.acknoledged ? alert('Registeration Successful!') : alert(result.message)
            }).catch(err => console.warn(err))
        }).catch(err => console.log(err))
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
                    <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12 text-center">{state?.data ? `Let's Get Started.` : 'Create Your Profile'}</h1>

                    <form className="mt-6" onSubmit={e => handleSignup(e)} encType="multipart/form-data">
                        <div className="flex items-center justify-center w-full rounded-full">
                            <label htmlFor="profile" className="flex flex-col items-center justify-center w-40 h-40 rounded-full border-gray-300 border-dashed cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    {
                                        image.preview ? (
                                            <img className="w-40 h-40 object-cover object-top rounded-full" src={image.preview} alt={state?.data?.displayName} />
                                        ) : (
                                            <>
                                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">PNG or JPG (MAX. 800x400px)</p>
                                            </>
                                        )
                                    }
                                </div>
                                <input id="profile" type="file" className="hidden" name="profile" onChange={e => handleImageChange(e)} />
                            </label>
                        </div>

                        <div>
                            <label htmlFor="userName" className="block text-gray-700">User Name</label>
                            <input type="text" name="userName" id="userName" defaultValue={newUser.userName} onChange={e => handleChange(e)} placeholder="Enter User Name" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autoComplete='true' required />
                            {/* <p className="text-red-500 text-xs italic mt-1">{errors.email?.message}</p> */}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-gray-700">Email Address</label>
                            <input type="email" name="email" id="email" defaultValue={newUser.email} onChange={e => handleChange(e)} placeholder="Enter Email Address" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autoComplete='true' required />
                            {/* <p className="text-red-500 text-xs italic mt-1">{errors.email?.message}</p> */}
                        </div>

                        <div className="mt-4">
                            <label htmlFor="password" className="block text-gray-700">Password</label>
                            <input type="password" name="password" id="password" placeholder="Enter Password" onChange={e => handleChange(e)} minLength="6" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" required />
                            {/* <p className="text-red-500 text-xs italic mt-1">{errors.password?.message}</p> */}
                        </div>

                        <input type="submit" className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6" value={'Sign Up'} />
                    </form>

                    <hr className="my-6 border-gray-300 w-full" />

                    <p className="mb-4">Have an account? <Link to={'/login'} className="text-blue-500 hover:text-blue-700 font-semibold">login</Link></p>


                </div>
            </div>

        </section>
    )
}

export default SignUp