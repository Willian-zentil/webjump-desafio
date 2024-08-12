import React from 'react'
import { useParams } from 'react-router-dom';

import './Breadcrumb.scss'

function Breadcrumb() {

    const { category, id } = useParams();

    return (
        <div className='breadcrumbs'>
            <a href='/'>Página inicial</a>
            <span>></span>
            <a href='#'>{category}</a>
        </div>
    )
}

export default Breadcrumb