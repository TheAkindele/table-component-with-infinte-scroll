import React from 'react'
import { Checkbox } from 'components/checkbox/Checkbox'
import { useSelectRow } from 'customHooks/useSelectRow'

export interface ITable<T, C> {
  onRowClick: () => void
  columns: Array<C>
  rows: any
}

const obj = {name: "wale"}

export function Table<T, C>({columns, rows, onRowClick}: ITable<T, C>) {
  const {
    selectedRowArray, 
    selectSingleRow, 
    selectAllRows, 
    activateCheckbox
  } = useSelectRow()

  return (
    <div className='table-cont'>
        <table data-testid="table"  >
            <thead data-testid="t-head">
                <tr data-testid="header-row">
                    <th >
                        <Checkbox
                            value={selectedRowArray?.length === rows.length}
                            onChange={() => selectAllRows(rows)}
                            data-testid="column-checkbox"
                        />
                    </th>
                    {columns.map((col: any) => (
                      <th key={col.id} data-testid="th"
                            style={{width: col?.width}} 
                            className={`t-head`}
                      >
                            {col.label}
                      </th>
                    ))}
                </tr>
            </thead>

            <tbody data-testid="t-body" >
                {rows?.map((row: any) =>
                    <tr key={row.id} data-testid="table-row" className={`tbody-row`} 
                       // onClick={() => selectRow(row)}
                    >
                        <td>
                            <Checkbox
                                value={activateCheckbox(row)}
                                onChange={() => selectSingleRow(row)}
                                data-testid="row-checkbox"
                            />
                        </td>
                    {columns?.map((col: any) => 
                            <td key={col.id} data-testid="td" 
                                onClick={onRowClick}
                                style={{width: col.width, textAlign: row[col.id] && !isNaN(row[col.id]) && "right" }} 
                                className={`t-data ${col?.width}`}
                            >
                                {row[col.id]}
                            </td>
                    )}
                    </tr>
                )}
            </tbody>
        </table>
    </div>
  )
}