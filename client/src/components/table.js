import React, { useReducer } from 'react'
import {
  Anchor,
  Box,
  Table as GrommetTable,
  TableCell,
  TableBody,
  TableHeader,
  TableRow,
  Text
} from 'grommet'
import { Ascend, Descend, More } from 'grommet-icons'

const sortBy = field => ({
  type: 'sort',
  field
})

const getInitialValue = tableData => ({
  sortedBy: null,
  descending: null,
  tableData
})

const reducer = (state, action) => {
  const { field } = action
  const { sortedBy } = state
  switch (action.type) {
    case 'sort': {
      const descending = field === sortedBy ? !state.descending : true
      let sorted
      if (!descending) {
        sorted = state.tableData.reverse()
      } else {
        sorted = state.tableData.sort((a, b) => {
          if (a[field] < b[field]) {
            return -1
          }
          if (a[field] > b[field]) {
            return 1
          }
          return 0
        })
      }
      return { sortedBy: field, descending, tableData: sorted }
    }
    default:
      return state
  }
}

const Table = ({ data, columnConfig, sortable }) => {
  const [{ tableData, sortedBy, descending }, dispatch] = useReducer(
    reducer,
    getInitialValue(data)
  )

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
          {columnConfig.map(({ label, key, isSortable = true }) => {
            let cell
            if (sortable && isSortable) {
              let icon
              if (key === sortedBy) {
                icon = descending ? <Descend /> : <Ascend />
              } else {
                icon = <More />
              }
              cell = (
                <Anchor onClick={() => dispatch(sortBy(key))}>
                  <Box direction="row" gap="xxsmall">
                    {icon} {label}
                  </Box>
                </Anchor>
              )
            } else {
              cell = (
                <Text color="brand" weight="bold">
                  {label}
                </Text>
              )
            }

            return <TableCell>{cell}</TableCell>
          })}
        </TableRow>
      </TableHeader>
      <TableBody>{tableData.map(row)}</TableBody>
    </GrommetTable>
  )
}

export default Table
