import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Form, InputGroup } from 'react-bootstrap';
import Validation from './Validation/Validation';
import classes from './Input.module.scss';

/**
 * Text Box for user input
 * See https://react-bootstrap.github.io/forms/overview/ for examples and documentation of Form Controls
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {String} [ariaLabel=''] - Replaces what is read to the screenreader
 * @property {String} error - Applies a error message for the user to see
 * @property {String} label - Label for the Input
 * @property {Boolean} [required] - Assigns if the field is required or not
 * @property {String} name - Defines the name of the Input
 * @property {Boolean} [disabled=false] - Disables the functionality and greys it out
 * @property {Function} [onBlur=()=>{}] - When the Input is clicked off, this function will occur
 * @property {Function} [onChange=()=>{}] - When the Input changes, this function will occur
 * @property {String} [value=''] - Control for Input data
 * @property {String} [className=''] - Manually change the styling of the Input by passing in a className.  Allows the use of custom CSS.
 * @property {String} [labelClass=''] - Manually change the styling of the label by passing in a className.  Allows the use of custom CSS.
 * @property {String} [placeholder=''] - placeholder that displays when no input is in the box
 * @property {Boolean} [readOnly] - disables input
 * @property {String} [type='text'] - Type of input
 * @property {Function} [onFocus=()=>{}] - When the user clicks on Input field, this function will occur
 * @property {Function} [onKeyDown=()=>{}] - When the user presses a key in Input field, this function will occur
 * @property {JSX} [children] - Any children to be rendered below the component
 * @property {String} [size='medium'] - Default size styling in 'small', 'medium' and 'large'
 * @property {Boolean} [inline] - Shows inline validation message instead of on alert
 * @property {Integer} [maxLength] - Max character length allowed for input
 * @returns {JSX} Input Component
 */

const Input = forwardRef((props, ref) => {
    const {
        ariaLabel,
        error,
        label,
        required,
        name,
        disabled,
        onBlur,
        onChange,
        value,
        className,
        labelClass,
        containerClass,
        inputClassOverwrite,
        placeholder,
        readOnly,
        type,
        onFocus,
        onKeyDown,
        children,
        size,
        inline,
        maxLength,
    } = props;

    const requiredLabel = (
        <>
            <span className={classes.required}>*</span> {label}
        </>
    );
    let inputClass = ` ${classes.inputContainer} ${className}`;
    inputClass += disabled ? ` ${classes.disabled}` : '';
    inputClass += error ? ` ${classes.inputContainer.error}` : '';
    let message = '';

    if (error) {
        if (error.type === 'required') {
            message = `required`;
        }
        message = error.message || message;
    }

    switch (size) {
        case 'small':
            inputClass += ` ${classes.small}`;
            break;
        case 'medium':
            inputClass += ` ${classes.medium}`;
            break;
        case 'large':
            inputClass += ` ${classes.large}`;
            break;
        default:
            inputClass += ` ${classes.inputContainer}`;
            break;
    }
    return (
        <Form.Group controlId={name} className={containerClass}>
            {label && (
                <>
                    <Form.Label className={`${classes.labelFont} ${labelClass}`}>{required ? requiredLabel : label}</Form.Label>
                    <Validation inline={inline} touched={!!error} errorMessage={message} />
                </>
            )}

            <InputGroup>
                <Form.Control
                    data-testid={name}
                    ref={ref}
                    name={name}
                    className={`${error ? classes.error : ''} ${inputClassOverwrite || inputClass}`}
                    aria-label={ariaLabel || label}
                    type={type}
                    placeholder={placeholder}
                    disabled={disabled}
                    value={value}
                    readOnly={readOnly}
                    onFocus={onFocus}
                    onKeyDown={onKeyDown}
                    onBlur={onBlur}
                    onChange={onChange}
                    maxLength={maxLength}
                />
                {children}
            </InputGroup>
        </Form.Group>
    );
});

Input.displayName = 'Input';

Input.defaultProps = {
    className: '',
    error: null,
    disabled: false,
    readOnly: false,
    ariaLabel: '',
    name: '',
    placeholder: '',
    type: 'text',
    value: undefined,
};

Input.propTypes = {
    ariaLabel: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    containerClass: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.object,
    inline: PropTypes.bool,
    inputClassOverwrite: PropTypes.string,
    label: PropTypes.string,
    labelClass: PropTypes.string,
    maxLength: PropTypes.number,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    type: PropTypes.string,
    value: PropTypes.any,
};

export default Input;
