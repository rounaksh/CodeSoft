import { useEffect, useState } from "react"
import Banner from "../Components/Banner"
import Card from "../Components/Card"
import Jobs from "./Jobs"
import Sidebar from "../Sidebar/Sidebar"
import Newletter from "../Components/Newletter"

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [jobs, setJobs] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 6

    useEffect(() => {
        setIsLoading(true)
        fetch('http://localhost:5000/all-jobs', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res => res.json()).then(data => {
            setJobs(data)
            setIsLoading(false)
        })
    }, [])

    // Handle input change
    const [query, setQuery] = useState('')
    const handleInputChange = event => {
        setQuery(event.target.value)
    }

    // Title Based Filtering
    const filteredItems = jobs.filter((job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1)

    // Button Based Filtering
    const handleChange = (event) => {
        setSelectedCategory(event.target.value)
    }

    // Button Based Filtering
    const handleClick = (event) => {
        setSelectedCategory(event.target.value)
    }

    //  Pagination
    const calculatePageRange = () => {
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        return { startIndex, endIndex }
    }

    // Next Page Login
    const nextPage = () => {
        if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1)
        }
    }

    // Previous Page Logic
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    // Main Funtions
    const filteredData = (jobs, selected, query) => {
        let filteredJobs = jobs
        // filtering searched items
        if (query) filteredJobs = filteredItems

        // Category filtering
        if (selected) {
            filteredJobs = filteredJobs.filter(
                ({
                    jobLocation,
                    maxPrice,
                    experienceLevel,
                    salaryType,
                    employmentType,
                    postingDate
                }) => (
                    jobLocation.toLowerCase() === selected.toLowerCase() || parseInt(maxPrice) <= parseInt(selected) || postingDate >= selected || salaryType.toLowerCase() === selected.toLowerCase() || experienceLevel.toLowerCase() === selected.toLowerCase() || employmentType.toLowerCase() === selected.toLowerCase()
                ))
        }

        // Items based on current page
        const { startIndex, endIndex } = calculatePageRange()
        filteredJobs = filteredJobs.slice(startIndex, endIndex)

        return filteredJobs.map((data, i) => <Card key={i} data={data} />)
    }

    const result = filteredData(jobs, selectedCategory, query)
    return (
        <div>
            <Banner query={query} handleInputChange={handleInputChange} />

            {/* Main Section */}
            <div className="bg-[#fafafa] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
                {/* Left Side */}
                <div className="bg-white p-4 rounded">
                    <Sidebar handleChange={handleChange} handleClick={handleClick} />
                </div>

                {/* Job Cards */}
                <div className="bg-white col-span-2 p-4 rounded-sm">
                    {
                        isLoading ? (<p className="font-medium">Loading...</p>) : result.length > 0 ? (<Jobs result={result} />) :
                            <>
                                <h3 className="text-lg font-bold mb-2">{result.length} Jobs</h3>
                                No data found!!
                            </>
                    }

                    {/* Pagination */}
                    {
                        result.length > 0 ? (
                            <div className="flex justify-center mt-4 space-x-8">
                                <button onClick={prevPage} disabled={currentPage === 1} className={`${currentPage === 1 ? 'text-gray-500' : ''} bg-blue hover: text-white px-3 py-1 rounded`}>Prev</button>
                                <span className="cursor-default py-1">Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}</span>
                                <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)} className={`${currentPage === 1 ? 'text-gray-500' : ''} bg-blue hover: text-white px-3 py-1 rounded`}>Next</button>
                            </div>
                        ) : ''
                    }
                </div>

                {/* Right Side */}
                <div className="bg-white p-4 rounded">
                    <Newletter />
                </div>
            </div>
        </div>
    )
}

export default Home