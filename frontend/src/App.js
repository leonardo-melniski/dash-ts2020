import React, { useState } from 'react';
import TableContent from './components/table'
import { Container } from 'semantic-ui-react';

function App({ rows }) {
  const [index, setIndex] = useState(1);
  const header = [
    // { label: 'id', key: 'id' },
    { label: 'Algoritmo', key: 'alg' },
    // { label: 'Título', key: 'word' },
    { label: 'Resumo', key: 'summ' },
    // { label: 'locurage', key: 'result' }
  ];

  function handleOnClick(x) {
    x >= 1 && setIndex(x);
  }
  return (
    <div>
      <h1></h1>
      <Container>
        <h1>
          {rows && rows[0] ? rows[0].word : ''}
        </h1>

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

