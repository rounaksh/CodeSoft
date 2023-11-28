import InputField from "../Components/InputField"

const JobPostingData = ({ handleChange }) => {
    const now = new Date()
    const twentyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000)
    const SevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000)
    const ThirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000)

    // Date to String
    const twentyFourHoursAgoDate = twentyFourHoursAgo.toISOString().slice(0, 10)
    const sevenDaysAgoDate = SevenDaysAgo.toISOString().slice(0, 10)
    const ThirtyDaysAgoDate = ThirtyDaysAgo.toISOString().slice(0, 10)

    return (
        <div>
            <h4 className="text-lg font-medium mb-2">Date of Posting</h4>

            <div>
                <label className="sidebar-label-container">
                    <input type="radio" value='' onChange={handleChange} />
                    <span className="checkmark"></span>Reset
                </label>

                <InputField handleChange={handleChange} value={twentyFourHoursAgoDate} title={'Last 24 Hrs'} name={'test2'} />
                <InputField handleChange={handleChange} value={sevenDaysAgoDate} title={'Last 7 Days'} name={'test2'} />
                <InputField handleChange={handleChange} value={ThirtyDaysAgoDate} title={'Last Month'} name={'test2'} />
            </div>
        </div>
    )
}

export default JobPostingData