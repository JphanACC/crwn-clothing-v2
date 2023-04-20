import { FormInputLabel, Group, Input } from './form-input.styles'

const FormInput = ({
    label,
    ...otherProps
    //,inputOptions 

}) => {
    return (
        <Group>
            <Input
                {...otherProps}
            />
            {
                //if label exists then render the label
                label &&
                <FormInputLabel
                    shrink={otherProps.value.length}
                //className={`${otherProps.value.length > 0 ? 'shrink' : ''} form-input-label`}
                >
                    {label}
                </FormInputLabel>
            }
        </Group>
    )
}

export default FormInput;