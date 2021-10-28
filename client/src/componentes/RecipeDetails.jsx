import React from 'react';

export default function RecipeDetails({name, data}) {
    return (
        <div>
            <label>{`${name}: `}</label>
            <label>{data}</label>
        </div>
    )
}

