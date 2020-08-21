import React from 'react'
import { Link } from 'react-router-dom'

export const Tag = (props) => {

    const template = (
        <div
            style={{
                background: props.bck,
                fontSize: props.size,
                color:props.color,
                padding:"5px 10px",
                display:'inline-block',
                fontFamily: "Righteous",
                ...props.add
            }}
        >
            {props.children}
        </div>
    )

    if (props.link){
       return (
           <Link to={props.linkTo}>
               {template}
           </Link>
       )
    } else{
        return template
    }
}

export const validate = (element) => {
    let error = [true, ''];

    if (element.validation.email) {
        const valid = /\S+@\S+\.\S+/.test(element.value);
        const message = `${!valid ? 'Email is Invalid' : ''}`;
        error = !valid ? [valid, message] : error;
    }

    if(element.validation.required){
        const valid = element.value.trim() !== '';
        const message = `${!valid ? 'This field is required':''}`;
        error = !valid ? [valid, message] : error;
    }

    return error

}