import React, { useState, useEffect } from 'react';
import TableContent from './components/table'
import { Icon, Menu, Container, Header, Input, Button, Popup } from 'semantic-ui-react';
import axios from 'axios';

// interface entity {
//   "index": 0,
//   "isPredicate": false,
//   "isModifier": false,
//   "label": null,
//   "start": 0,
//   "end": 1,
//   "text": "Although there",
//   "pb": null,
//   "vn": null,
//   "description": null,
//   "modifier": false,
//   "predicate": false
// }

function externalTokens({ tokens }) {
  return (
    // <a href="" alt={it.word}>
    <div>
      {tokens.filter(it => it.index).map(it => (
        <div>
          {`${it.text}.${it.label}`}
        </div>
      ))}
    </div>
  )
}

function renderPredicate(it) {
  return (
    <>
      <u>
        <strong>
          {`${it.text}`}
        </strong>
      </u>
    {' '}
    </>
  )
}
function externalSumm(item) {
  const tokens = item.result.tokens.filter(it => it.index);
  return (
    <p>
      {item.result.tokens.map(it => it.isPredicate ? renderPredicate(it) : `${it.text} `)}
    </p>
  );
  
  // return <strong>{item.summ}</strong>;
}

function handleExternal(type, item) {
  if (type === 'token')
    return externalTokens(item.result);
  if (type === 'summ')
    return externalSumm(item);
  return 'map missing';
}

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
  const labelResumo = (
    <div>
      Resumo&nbsp;
      <Popup content='Em destaque as palavaras que retonaram isPredicate==true' trigger={<Icon name='info' circular size="small"/>} />
    </div>
  )
  const header = [
    // { label: 'id', key: 'id' },
    { label: 'Algoritmo', key: 'alg' },
    // { label: 'Título', key: 'word' },
    { label: labelResumo, external: 'summ' },
    // { label: 'verbnet', key: 'result' }
    { label: 'Tokens', external: 'token' },
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
          onExternal={handleExternal}
        />
      </Container>
    </div>
  )
}

export default App;

