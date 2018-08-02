import React from 'react';
import logoUrl from './job.png';
import './logo.css'

export default function Logo(){
    return (
        <div className='logocontainer'>
            <img src={logoUrl} alt=""/>
        </div>
    )
}