import React, { useState, useEffect } from 'react';
import TableContent from './components/table'
import { Icon, Menu, Container, Header, Input } from 'semantic-ui-react';
import axios from 'axios';

function App() {
  const [index, setIndex] = useState(1);
  const [rows, setRows] = useState([]);

  useEffect(() => {
   const fetchData = async () => {
      const result = await axios.get(`${process.env.REACT_APP_API_URL}${index}`);
      if(result.status === 200)
        setRows(result.data);
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

  function handleOnClick(value) {
    if (value >= 1 && value <= 10000) {
      setIndex(value);
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
            <Menu.Item as='a' icon onClick={() => handleOnClick(index-1)}>
              <Icon name='chevron left' />
            </Menu.Item>
            <Menu.Item>
              <Input 
                size={'mini'}
                type={'number'}
                value={index}
                onChange={(e, data) => {
                  console.log(data)
                  handleOnClick(e.target.valueAsNumber)
                }}
              />
            </Menu.Item>
            <Menu.Item as='a' icon onClick={() => handleOnClick(index+1)}>
              <Icon name='chevron right'/>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <TableContent
          header={header}
          content={rows}
        />
      </Container>
    </div>
  )
}

export default App;

