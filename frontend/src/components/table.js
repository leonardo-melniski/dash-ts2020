import React from 'react'
import { Table } from 'semantic-ui-react'

const TableContent = ({ header, content, onExternal, filterAlg }) => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        {header && header.map((it,i) =>
          <Table.HeaderCell key={`h_${i}`}>{it.label}</Table.HeaderCell>
        )}
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {content && content.filter(it => !filterAlg.includes(it.alg)).map((row, i) => (
        <Table.Row key={`tr_${i}`}>
          {header && header.map((it, i) => (
            <Table.Cell key={`tc_${i}`}>
              {!it.external ? row[it.key] : onExternal(it.external, row)}
            </Table.Cell>
          ))}
          </Table.Row>
      ))}
    </Table.Body>
  </Table>
)

export default TableContent;