import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import PageHeader from '../Components/PageHeader'
import { FaSuitcase } from "react-icons/fa6";

const JobDetails = () => {
    const { id } = useParams()
    const [job, setJob] = useState([])
    const benifits = [
        { id: 1, value: [`₹${job?.minPrice}-₹${job?.maxPrice}`] },
        { id: 2, value: 'Disability Insaurance' },
        { id: 3, value: 'Employee Discount' },
        { id: 4, value: 'Flexible Spending Amount' },
        { id: 5, value: 'Health Insaurance' },
        { id: 6, value: 'Paid time off' },
        { id: 7, value: 'Vision Insaurance' },
        { id: 8, value: 'Volunteer time off' },
        { id: 9, value: 'Dental Insaurance' },
    ]

    useEffect(() => {
        fetch(`https://job-portal-u10r.onrender.com/all-jobs/${id}`).then(res => res.json()).then(data => setJob(data))
    }, [])

    const handleApply = async () => {
        const { value: url } = await Swal.fire({
            input: "url",
            inputLabel: "URL address",
            inputPlaceholder: "Enter the URL"
        });
        if (url) {
            Swal.fire(`Entered URL: ${url}`);
        }
    }
    console.log(job)

    return (
        <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
            <PageHeader title={'Single Job'} path={'single job'} />
            <div className='lg:w-6/12 md:w-6/12 sm:w-full'>
                <h2 className="font-medium mb-2 mt-5 text-base">Job ID: {id}</h2>
                <h3 className='text-blue font-bold text-2xl'>Job details</h3>
                <p className='font-light text-sm text-gray-500 italic'>Here&apos;s how the job details align with your job preferences. Manage job preferences anytime in your profile.</p>
            </div>

            <div className='flex flex-col mt-3'>
                <div className='flex items-center mb-3'>
                    <FaSuitcase />
                    <p className='ml-2 font-semibold text-2xl'>Job Type</p>
                </div>
                <div>
                    {job.employmentType && <button className='bg-blue px-8 py-2 text-white mr-4 rounded-sm sm:px-4' disabled>{job.employmentType}</button>}
                    <button className='bg-purple-900 px-8 py-2 text-white rounded-sm sm:px-4' onClick={handleApply}>Apply Now</button>
                </div>
            </div>

            <hr className='my-6' />
            <div className='grid lg:grid-cols-3 md:grid-cols-2 my-5'>
                <div className='lg:col-span-1 md:col-span-full md:mb-3'>
                    <h2 className='text-primary text-xl font-semibold mb-3'>Benifits</h2>
                    <span className="block text-sm  text-gray-500 truncate dark:text-gray-400 mb-1">Pulled from the full job description</span>
                    <ol type='1' className='ml-4'>
                        {
                            benifits && benifits.map((data) => (
                                <li className='list-[auto] pb-3' key={data.id}>{data.value}</li>
                            ))
                        }
                    </ol>
                </div>
                <div className='md:col-auto'>
                    <h2 className='text-primary text-xl font-semibold mb-2'>Outline</h2>
                    <p className='font-light whitespace-break-spaces lg:pr-4 md:pr-2 pb-3'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis unde doloribus rerum eius optio vero veniam quia vel laudantium consequatur a nobis dolorum sunt, iusto, delectus qui molestias! Autem, molestiae.
                    </p>
                    <p className='font-light whitespace-break-spaces lg:pr-4 md:pr-2 pb-3'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque ratione cum est, hic voluptas, nobis quos eligendi facere officiis labore dolorem blanditiis distinctio natus, molestias qui! Architecto rerum cum officia! Neque asperiores autem, pariatur distinctio dolores beatae praesentium debitis tempora reprehenderit enim numquam labore vitae cupiditate consequuntur dignissimos excepturi inventore.
                    </p>
                </div>
                <div className='md:col-auto'>
                    <h2 className='text-primary text-xl font-semibold mb-2'>Future Growth</h2>
                    <p className='font-light whitespace-break-spaces lg:pr-4 md:pr-2 pb-3'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos pariatur sapiente obcaecati odit eos magni repudiandae provident perspiciatis, dolorum omnis libero! Sit corporis illum aliquid optio culpa temporibus, accusantium rerum?
                    </p>
                    <p className='font-light whitespace-break-spaces lg:pr-4 md:pr-2 pb-3'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, quam voluptatibus eligendi perferendis error eum fugit tempora voluptate sit earum debitis neque quibusdam molestias, excepturi nobis aperiam culpa asperiores hic.
                    </p>
                </div>
            </div>
            <hr className='mb-6' />
            <div className='mb-5'>
                <p className='font-light whitespace-break-spaces pb-3'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos reprehenderit distinctio deleniti error molestias fugiat, autem iure assumenda recusandae at nesciunt ex sit hic, veniam ut repellat! Ullam totam blanditiis expedita optio rem voluptatibus, natus quis eligendi non consectetur id vitae, tempora illum molestiae ab mollitia quos, autem suscipit dicta.
                </p>
                <p className='font-light hitespace-break-spaces pb-3'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos reprehenderit distinctio deleniti error molestias fugiat, autem iure assumenda recusandae at nesciunt ex sit hic, veniam ut repellat! Ullam totam blanditiis expedita optio rem voluptatibus, natus quis eligendi non consectetur id vitae, tempora illum molestiae ab mollitia quos, autem suscipit dicta.
                </p>
                <p className='font-light hitespace-break-spaces pb-3'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos reprehenderit distinctio deleniti error molestias fugiat, autem iure assumenda recusandae at nesciunt ex sit hic, veniam ut repellat! Ullam totam blanditiis expedita optio rem voluptatibus, natus quis eligendi non consectetur id vitae, tempora illum molestiae ab mollitia quos, autem suscipit dicta.
                </p>
            </div>
        </div>
    )
}

export default JobDetails