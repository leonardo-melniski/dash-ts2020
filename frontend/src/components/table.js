import React from 'react'
import { Table } from 'semantic-ui-react'

const TableContent = ({ header, content, onClickLeft, onClickRight }) => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        {header && header.map(it =>
          <Table.HeaderCell>{it.label}</Table.HeaderCell>
        )}
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {content && content.map((row, i) => (
        <Table.Row key={i}>
          {header && header.map((it, i) => (
              <Table.Cell key={i}>{row[it.key]}</Table.Cell>
          ))}
          </Table.Row>
      ))}
    </Table.Body>
  </Table>
)

export default TableContent;