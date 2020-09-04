import React, { useState, useEffect } from 'react';
import TableContent from './components/table'
import { Icon, Menu, Container, Header, Input, Popup } from 'semantic-ui-react';
import axios from 'axios';


function externalTokens({ tokens }) {
  return (
    <div>
      {tokens.filter(it => it.label).map(it => (
        <div>
          {`${it.text}.${it.label}`}
        </div>
      ))}
    </div>
  )
}

function findProp(item, props, tokens) {
  return props[tokens.filter(it => it.label).findIndex(it => it.start === item.start)];
}
function renderPredicate(item, result) {
  const { tokens, props } = result;
  // map (tokens, props)
  // const map = tokens
  //   .filter(it => it.label)
  //   .map((it, i) => ({
  //     [`${it.text}-${it.label}`]: props[i].sense
  //   })
  // );
  const prop = findProp(item, props, tokens);
  return (
    <>
      <Popup 
        content={prop.sense}
        trigger={<u><strong>{item.text}</strong></u>} />
    {' '}
    </>
  )
}
function externalSumm(item) {
  return (
    <p>
      {item.result.tokens.map(it => it.isPredicate ? renderPredicate(it, item.result) : `${it.text} `)}
    </p>
  );
}

function externalSynonym(item, i) {
  const { tokens, props } = item.result;
  return (
    <div>
      {tokens.filter(it => it.label).map(it => (
        <div>
          {i === 0 
            ?`${findProp(it, props, tokens).sense.split('-', 1)}` 
            : findProp(it, props, tokens).sense.split('-').filter((it, i) => i !== 0).join('-')
          }
        </div>
      ))}
    </div>
  )
}

function handleExternal(type, item) {
  if (type === 'token')
    return externalTokens(item.result);
  if (type === 'summ')
    return externalSumm(item);
  if (type === 'synonym')
    return externalSynonym(item, 0);
  if (type === 'reference')
    return externalSynonym(item, 1);
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
    { label: 'Sinônimos', external: 'synonym' },
    { label: 'Referência', external: 'reference' },
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
          filterAlg={['random', 'lsa']}
        />
      </Container>
    </div>
  )
}

export default App;

