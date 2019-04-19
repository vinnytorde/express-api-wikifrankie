import React from 'react'

const Table = ({ data, columnConfig, hightlightOnHover, onRowClick }) => {
  const row = data => {
    const rowAttributes = {
      className: hightlightOnHover ? 'hover-highlight' : '',
      onClick: () => onRowClick(data)
    }

    return (
      <tr {...rowAttributes}>
        {columnConfig.map(columnMeta => {
          const modifier = columnMeta.modifier
          const value = data[columnMeta.key]
          return <td>{modifier ? modifier(value) : value}</td>
        })}
      </tr>
    )
  }

  return (
    <table className="table">
      <thead>
        <tr>
          {columnConfig.map(({ label }) => {
            return <td className="bold">{label}</td>
          })}
        </tr>
      </thead>
      <tbody>{data.map(row)}</tbody>
    </table>
  )
}

export default Table
