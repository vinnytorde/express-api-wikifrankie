import React, { useState } from 'react'
import {
  Anchor,
  Table as GrommetTable,
  TableCell,
  TableBody,
  TableHeader,
  TableRow
} from 'grommet'

const Table = ({ data, columnConfig, sortable }) => {
  const [sorted, setSorted] = useState(data)

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

  const sortBy = field => {
    setSorted(
      [...data].sort((a, b) => {
        if (a[field] < b[field]) {
          return -1
        }
        if (a[field] > b[field]) {
          return 1
        }
        return 0
      })
    )
  }

  return (
    <GrommetTable>
      <TableHeader>
        <TableRow>
          {columnConfig.map(({ label, key }) => {
            return (
              <TableCell>
                {sortable ? (
                  <Anchor onClick={() => sortBy(key)}>{label}</Anchor>
                ) : (
                  { label }
                )}
              </TableCell>
            )
          })}
        </TableRow>
      </TableHeader>
      <TableBody>{sorted.map(row)}</TableBody>
    </GrommetTable>
  )
}

export default Table
