import { Dispatch, SetStateAction } from 'react'
import { Checkbox } from 'components/checkbox/Checkbox'
import { useSelectRow } from 'customHooks/useRowSelection/useSelectRow'

export interface ITable<T, M> {
    rows: Array<T>
    columns: Array<M>
    // columns: {id: string | number, label: string, width?: string}[]
    onRowClick?: Function
    loading?: boolean
    rowSelector?: boolean;
    setLastElement?: Dispatch<SetStateAction<null>>
}


export const Table = <T, M,> ({columns, rows, loading, rowSelector, setLastElement}: ITable<T, M>) => {
    // console.log("data sent==", rows) <ITable>

  const {
    selectedRowsArray, 
    selectSingleRow, 
    selectAllRows, 
    activateCheckbox
   } = useSelectRow()

  return (
    <div className='table-cont'>
        <table data-testid="table"  >
            <thead data-testid="t-head">
                <tr data-testid="header-row" className='header-row'>
                   {rowSelector && <th >
                        <Checkbox
                            value={rows.length > 0 && selectedRowsArray?.length === rows.length}
                            onChange={() => selectAllRows(rows)}
                            data-testid="column-checkbox"
                        />
                    </th>}
                    {columns.map((col: any, i: number) => (
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
                {rows?.length ?
                rows?.map((row: any, i: number) => (
                    <tr key={row.id} data-testid="body-row" 
                        className={`tbody-row ${selectedRowsArray.includes(row) && "active"}`}
                        //@ts-ignore
                        ref={setLastElement}
                    >
                        {rowSelector && 
                         <td className="table-data-check">
                            <Checkbox
                                value={activateCheckbox(row)}
                                onChange={() => {
                                    selectSingleRow(row)
                                }}
                                data-testid="row-checkbox"
                            />
                        </td>}
                    {columns?.map((col: any, i: number) => 
                            <td key={col.id} data-testid="row-data" 
                                // onClick={() => onRowClick(row)}
                                className={`table-data ${!isNaN(row[col.id]) && "numeric-field"}`} 
                            >
                                {row[col.id]}
                            </td>
                    )}
                    </tr>
                ))
                : loading ? (<tr>
                    <td style={{fontSize: "2rem", color: "blue"}}>Loading...</td>
                </tr>)
                : (<tr><td>Empty</td></tr> )
                }
            </tbody>
        </table>

    </div>
  )
}