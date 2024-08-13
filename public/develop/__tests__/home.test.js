import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../src/components/Home/Home';
import FiltrePor from '../src/components/FiltrePor/FiltrePor';

describe('Home Component', () => {
  it('should render texts of home', () => {
    const { getByText } = render(<BrowserRouter><Home /></BrowserRouter>);
    expect(getByText('Seja bem-vindo!', { selector: 'h1' })).toBeInTheDocument();
  });
});

describe('Category Component', () => {
  it('should render a item of categories list ', async () => {
    render(<BrowserRouter><FiltrePor /></BrowserRouter>);
    expect(await screen.findByText('Camisetas')).toBeInTheDocument();
  });
});