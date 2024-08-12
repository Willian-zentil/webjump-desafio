import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './FiltrePor.scss';

function FiltrePor({ onColorChange, onGenderChange }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8888/api/V1/categories/list')
      .then(response => {
        setData(response.data.items || []);
      })
      .catch(error => {
        console.error('Houve um erro ao buscar os dados:', error);
      });
  }, []);

  return (
    <div className='filtro-aside'>
      <h2>Filtre Por</h2>
      <h3 className='title-categories'>Categorias</h3>
      <ul>
        {data.map((item) => (
          <li key={item.id}><a href={`/category/${item.id}/${item.path}`}>• {item.name}</a></li>
        ))}
      </ul>
      
      <h3>Cores</h3>
      <ul className='cores'>
        <li className='cor Preta' onClick={() => onColorChange('Preta')}></li>
        <li className='cor Laranja' onClick={() => onColorChange('Laranja')}></li>
        <li className='cor Amarela' onClick={() => onColorChange('Amarela')}></li>
        <li className='cor Rosa' onClick={() => onColorChange('Rosa')}></li>
        <li className='cor Cinza' onClick={() => onColorChange('Cinza')}></li>
        <li className='cor Azul' onClick={() => onColorChange('Azul')}></li>
        <li className='cor Bege' onClick={() => onColorChange('Bege')}></li>
      </ul>

      <h3>Gênero</h3>
      <ul>
        <li onClick={() => onGenderChange('Masculina')}>• Masculina</li>
        <li onClick={() => onGenderChange('Feminina')}>• Feminina</li>
      </ul>
    </div>
  );
}

export default FiltrePor;
