import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FiltrePor from '../FiltrePor/FiltrePor';

import './ContentCategory.scss';

function ContentCategory() {
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [title, setTitle] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8888/api/V1/categories/${id}`)
            .then(response => {
                const items = response.data.items || [];
                setData(items);
                setFilteredData(items); // Inicialmente, todos os itens são exibidos
            })
            .catch(error => {
                console.error('Houve um erro ao buscar os dados da categoria:', error);
            });
    }, [id]);

    useEffect(() => {
        axios.get(`http://localhost:8888/api/V1/categories/list`)
            .then(response => {
                const categories = response.data.items || [];
                setCategories(categories);

                const category = categories.find(item => item.id.toString() === id);

                if (category) {
                    setTitle(category.name);
                }
            })
            .catch(error => {
                console.error('Houve um erro ao buscar a lista de categorias:', error);
            });
    }, [id]);

    // Função para filtrar por gênero
    const handleGenderChange = (gender) => {
        setSelectedGender(gender);
    };

    // Função para filtrar por cor
    const handleColorChange = (color) => {
        setSelectedColor(color);
    };

    // Filtra os dados com base no gênero e na cor
    useEffect(() => {
        let filtered = data;

        if (selectedGender) {
            filtered = filtered.filter(item => item.filter.some(f => f.gender === selectedGender));
        }

        if (selectedColor) {
            filtered = filtered.filter(item => item.filter.some(f => f.color === selectedColor));
        }

        setFilteredData(filtered);
    }, [selectedGender, selectedColor, data]);

    return (
        <div>
            <div className='content-category'>
                <FiltrePor onColorChange={handleColorChange} onGenderChange={handleGenderChange} />
                <div className='flex-content'>
                    <h1 className='title'>{title}</h1>
                    <div className='row'>
                        {filteredData.length > 0 ? (
                            filteredData.map((item) => (
                                <a href='#' className='card' key={item.id} color={item.filter[0]?.color} sku={item.sku} >
                                    <img src={`http://localhost:8888/${item.image}`} alt={item.name} />
                                    <span className='name'>{item.name}</span>
                                    {item.specialPrice ? (
                                        <div>
                                            <span className='price old'>
                                                {`R$ ${item.price.toFixed(2).replace('.', ',')}`}
                                            </span>
                                            <span className='price'>
                                                {`R$ ${item.specialPrice.toFixed(2).replace('.', ',')}`}
                                            </span>
                                        </div>
                                    ) : (<div>
                                        <span className='price old'></span>
                                        <span className='price'>
                                            {`R$ ${item.price.toFixed(2).replace('.', ',')}`}
                                        </span>
                                    </div>
                                    )}
                                    <a href='#'>Comprar</a>
                                </a>
                            ))
                        ) : (
                            <p>Nenhum item encontrado.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContentCategory;
