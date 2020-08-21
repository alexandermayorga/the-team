import React from 'react'

const FormField = ({id, formData, change}) => {

    const showErrorMessage = () => {
        let errorMessage = 
            <div className="error_label">
                {
                    formData.validation && !formData.valid ?
                        formData.validationMessage
                        : null
                }
            </div>

        return errorMessage
    }
    
    const renderTemplate = () => {
        let formTemplate = null;

        switch (formData.element) {
            case ('input'):
                formTemplate = (
                    <div>
                        {formData.showLabel ?
                            <div className="label_inputs">
                                {formData.config.label}
                            </div>
                            : null
                        }
                        <input
                            {...formData.config}
                            value={formData.value}
                            onChange={e => change({ e, id })}
                        />
                        {showErrorMessage()}
                    </div>
                )
                break;
            case ('select'):
                formTemplate = (
                    <div>
                        {formData.showLabel ?
                            <div className="label_inputs">
                                {formData.config.label}
                            </div>
                            : null
                        }
                        <select 
                            value={formData.value}
                            onChange={e => change({ e, id })}
                        >
                            <option value="">Select One</option>
                            {
                                formData.config.options.map(item => (
                                    <option key={item.key} value={item.key}>{item.value}</option>
                                ))
                            }
                        </select>
                        {showErrorMessage()}
                    </div>
                )
                break;
            default:
                formTemplate = null;
                break;
        }

        return formTemplate;
    }

    return (
        <div>
            {renderTemplate()}
        </div>
    )
}

export default FormField
