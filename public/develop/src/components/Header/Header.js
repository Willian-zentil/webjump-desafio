import React, { useEffect, useState } from 'react';
import Container from '../Container/Container'
import axios from 'axios';

import './Header.scss'
import logo from '../../assets/webjump-Logo-webjump.png'

function Header() {
    const [data, setData] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:8888/api/V1/categories/list')
            .then(response => {
                setData(response.data);
                setData(response.data.items || []);
            })
            .catch(error => {
                console.error('Houve um erro ao buscar os dados:', error);
            });
    }, []);

    return (
        <header>
            <div className='topbar'>
                <Container>
                    <div>
                        <a href='#'>Acesse sua Conta</a><span>ou</span><a href='#'>Cadastre-se</a>
                    </div>
                </Container>
            </div>
            <div className='container-logo'>
                <Container>
                    <a href='/'><img className='logo' src={logo} alt={"logo webjump"} /></a>
                    <form action=''>
                        <input type='text' id='Buscar' className='input-input' />
                        <input type="submit" value="Submit" placeholder='Buscar' className='input-buscar' />
                    </form>
                </Container>
            </div>
            <nav className='menu-desktop'>
                <Container>
                    <ul>
                        <li><a href={`/`}>PÁGINA INICIAL</a></li>
                        {data.map((item) => (
                            <li key={item.id}><a href={`${item.path}`}>{item.name}</a></li>
                        ))}
                        <li><a href={`/`}>CONTATO</a></li>
                    </ul>
                </Container>
            </nav>
        </header>
    )
}

export default Header