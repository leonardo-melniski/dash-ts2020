import React, { useState, useEffect } from 'react';
import TableContent from './components/table'
import { Icon, Menu, Container, Header } from 'semantic-ui-react';
import axios from 'axios';

function App() {
  const [index, setIndex] = useState(1);
  const [rows, setRows] = useState([]);

  useEffect(() => {
   const fetchData = async () => {
      const result = await axios.get(`http://localhost:8080/api/${index}`);
      setRows(result.data)
    };
    fetchData();
  }, [index]);

  const header = [
    // { label: 'id', key: 'id' },
    { label: 'Algoritmo', key: 'alg' },
    // { label: 'Título', key: 'word' },
    { label: 'Resumo', key: 'summ' },
    // { label: 'locurage', key: 'result' }
  ];

  function handleOnClick(x) {
    if (index >= 1 && index <= 10000) {
      setIndex(index + x);
    }
  }
  return (
    <div>
      <br /><br />
      <Container>
        <Header as="h1">
          {rows && rows[0] ? rows[0].word : ''}
        </Header>
        <Menu pointing secondary>
          <Menu.Menu float='right' postition='right' >
            <Menu.Item as='a' icon onClick={() => handleOnClick(-1)}>
              <Icon name='chevron left' />
            </Menu.Item>
            <Menu.Item as='a' icon onClick={() => handleOnClick(1)}>
              <Icon name='chevron right'/>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <TableContent
          header={header}
          content={rows}
          onClickLeft={() => handleOnClick(-1)}
          onClickRight={() => handleOnClick(1)}
        />
      </Container>
    </div>
  )
}

export default App;

