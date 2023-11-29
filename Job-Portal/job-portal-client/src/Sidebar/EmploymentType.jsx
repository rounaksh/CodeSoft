import InputField from "../Components/InputField"

const EmploymentType = ({ handleChange }) => {
    return (
        <div>
            <h4 className="text-lg font-medium mb-2">Type of employment</h4>

            <div>
                <label className="sidebar-label-container">
                    <input type="radio" value='' onChange={handleChange} />
                    <span className="checkmark"></span>Any Experience
                </label>

                <InputField handleChange={handleChange} value={'temporary'} title={'Temporary'} name={'test'} />
                <InputField handleChange={handleChange} value={'full-time'} title={'Full-time'} name={'test'} />
                <InputField handleChange={handleChange} value={'part-time'} title={'Part-time'} name={'test'} />
            </div>
        </div>
    )
}

export default EmploymentType