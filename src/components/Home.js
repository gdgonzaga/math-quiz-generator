import { useState } from 'react';
import Addition from './Addition';
import Subtraction from './Subtraction';

import 'bootstrap/dist/css/bootstrap.min.css'
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

export default function Home() {
  const [operation, setOperation] = useState('')

  return (
    <Container className='py-3'>
      <h1 class="d-flex justify-content-center">Math quiz generator</h1>
      <Nav as="ul" className='justify-content-center my-3'>
        <Nav.Item as="li">
          <Nav.Link onClick={ () => setOperation('addition') }>Addition</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link onClick={ () => setOperation('subtraction') }>Subtraction</Nav.Link>
        </Nav.Item>
      </Nav>
      <div>
        {operation === 'addition' && <Addition />}
        {operation === 'subtraction' && <Subtraction />}
        {operation === '' && <p class="d-flex justify-content-center">Select an operation above</p>}
      </div>
    </Container>
  )
};

// vim: ft=javascriptreact