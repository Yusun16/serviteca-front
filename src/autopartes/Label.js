import React from 'react'

function Label(props) {
    return (
        <label className={props.className} htmlFor={props.htmlFor}>{props.name}</label>
    )
}

export default Label