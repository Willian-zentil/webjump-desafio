
import React, { useEffect, useState } from 'react';

import Header from '../Header/Header'
import Breadcrumb from '../Breadcrumb/Breadcrumb'
import Container from '../Container/Container'
import Footer from '../Footer/Footer'
import ContentCategory from '../ContentCategory/ContentCategory'

import './Category.scss'

function Category() {


  return (
    <div className='category'>
      <Header />
      <Container>
        <Breadcrumb />
        <ContentCategory />
      </Container>
      <Footer />
    </div>
  )
}

export default Category