import React from 'react'
import {
  Table as GrommetTable,
  TableHeader,
  TableRow,
  TableCell,
  TableBody
} from 'grommet'

const Table = ({ data, columnConfig }) => {
  const row = data => {
    return (
      <TableRow>
        {columnConfig.map(columnMeta => {
          const modifier = columnMeta.modifier
          const value = data[columnMeta.key]
          return <TableCell>{modifier ? modifier(value) : value}</TableCell>
        })}
      </TableRow>
    )
  }

  return (
    <GrommetTable>
      <TableHeader>
        <TableRow>
          {columnConfig.map(({ label }) => {
            return <TableCell>{label}</TableCell>
          })}
        </TableRow>
      </TableHeader>
      <TableBody>{data.map(row)}</TableBody>
    </GrommetTable>
  )
}

export default Table
