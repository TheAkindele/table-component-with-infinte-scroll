import React from 'react'

// interface Props {
//     rows?: any
//     rowData?: object
//     data?: any
// }

export const useSelectRow = <T,C,> () => {
    const [selectedRowsArray, setSelectedRowsArray] = React.useState<any>([])
   //  const [checked, setChecked] = useState<any>([])

    const selectAllRows = React.useCallback((rows: T[]) => {
        if (selectedRowsArray?.length !== rows?.length) {
            return setSelectedRowsArray(rows)
        } else {
            return setSelectedRowsArray([])
        }
    }, [selectedRowsArray?.length])

    const selectSingleRow = React.useCallback((rowData: C) => {
        const valueExist = selectedRowsArray?.find((item: unknown) => item === rowData)
        if (valueExist) {
			const filtered = selectedRowsArray?.filter(
				(item: any) => item !== valueExist
			);
			return setSelectedRowsArray(filtered);
		} else {
			setSelectedRowsArray((prevState: any) => {
                return [...prevState, rowData]
            });
	    }
    }, [selectedRowsArray])

    const activateCheckbox = React.useCallback((rowData: C) => {
        const valueExist = selectedRowsArray?.find((item: any) => item === rowData)
        if (valueExist) {
            return true
        }
        else {
            return false
        }
    }, [selectedRowsArray])

    // console.log("selectedRowsArray==", selectedRowsArray)
    
  return {selectedRowsArray, selectSingleRow, selectAllRows, activateCheckbox}

}