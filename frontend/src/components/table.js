import React from 'react'
import { Icon, Menu, Table } from 'semantic-ui-react'

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
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='3' >
          <Menu floated='right' pagination>
            <Menu.Item as='a' icon onClick={onClickLeft}>
              <Icon name='chevron left' />
            </Menu.Item>
            <Menu.Item as='a' icon onClick={onClickRight}>
              <Icon name='chevron right'/>
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
)

export default TableContent;