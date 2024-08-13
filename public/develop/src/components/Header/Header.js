import React, { useEffect, useState } from 'react';
import Container from '../Container/Container'
import axios from 'axios';
import Hamburger from 'hamburger-react'

import './Header.scss'
import logo from '../../assets/logo_webjump.webp'
import lupa from '../../assets/lupa.png'

function Header() {
    const [data, setData] = useState([]);
    const [isOpen, setOpen] = useState(false)
    const closeMenu = () => setOpen(false);

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
                    <div className='content-header'>
                        <div className='hamburger-react'>
                            <Hamburger toggled={isOpen} toggle={setOpen} />
                        </div>
                        {isOpen && <div className="overlay" onClick={closeMenu}></div>}

                        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                            <ul>
                                <li><a href='/'>Página Inicial</a></li>
                                <li><a href='/category/1/camisetass'>Camisetas</a></li>
                                <li><a href='/category/2/calcas'>Calças</a></li>
                                <li><a href='/category/3/calcados'>Sapatos</a></li>
                                <li><a href='#'>Contato</a></li>
                            </ul>
                        </div>


                        <a href='/'><img className='logo' src={logo} alt={"logo webjump"} /></a>
                        <form action=''>
                            <input type='text' id='Buscar' className='input-input' />
                            <input type="submit" value="Buscar" placeholder='Buscar' className='input-buscar' />
                        </form>

                        <img className='lupa' src={lupa} alt='buscar...' />
                    </div>
                </Container>
            </div>
            <nav className='menu-desktop'>
                <Container>
                    <ul>
                        <li><a href={`/`}>PÁGINA INICIAL</a></li>
                        {data.map((item) => (
                            <li key={item.id}><a href={`/category/${item.id}/${item.path}`}>{item.name}</a></li>
                        ))}
                        <li><a href={`/`}>CONTATO</a></li>
                    </ul>
                </Container>
            </nav>
        </header>
    )
}

export default Header