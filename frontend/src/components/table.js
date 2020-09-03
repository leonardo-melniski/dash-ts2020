import React from 'react'
import { Table } from 'semantic-ui-react'

const TableContent = ({ header, content }) => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        {header && header.map((it,i) =>
          <Table.HeaderCell key={`h_${i}`}>{it.label}</Table.HeaderCell>
        )}
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {content && content.map((row, i) => (
        <Table.Row key={`tr_${i}`}>
          {header && header.map((it, i) => (
              <Table.Cell key={`tc_${i}`}>{row[it.key]}</Table.Cell>
          ))}
          </Table.Row>
      ))}
    </Table.Body>
  </Table>
)

export default TableContent;