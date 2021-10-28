import React from 'react';

function Formulario({name, type, value, handle_function, error_control}) {
    return (
        <div>
            <div>
                <label >{`${name}: `}</label>
                <input type={type} value={value} name={name.toLowerCase()} onChange={handle_function} />
               
               
            </div>
            {
                error_control[name.toLowerCase()] && (
                    <p>{error_control[name.toLowerCase()]}</p>
                )
            }
        </div>
        
    )
}

export default Formulario;