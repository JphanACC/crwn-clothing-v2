import './form-input.styles.scss'

const FormInput = ({ 
    label, 
    ...otherProps
    //,inputOptions 
    
}) => {
    return (
        <div className="group">
            <input
                className="form-input"
                {...otherProps}
            />
            {
                //if label exists then render the label
                label &&
                <label className={`${otherProps.value.length > 0 ? 'shrink' : ''} form-input-label`}>{label}</label>
            }
        </div>
    )
}

export default FormInput;