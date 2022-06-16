import React from 'react'

interface Props<B> {
    rows?: any
    rowData?: object
}

export function useSelectRow<B>()  {
    const [selectedRowArray, setselectedRowArray] = React.useState<B[] | undefined>([])

    const selectAllRows = ({rows}: Props<B>) => {
        if (selectedRowArray?.length !== rows?.length) {
            setselectedRowArray(rows)
        } else {
            setselectedRowArray([])
        }
    }

    const selectSingleRow = ({rowData}: Props<B>) => {
        const valueExist = selectedRowArray?.find((item: unknown) => item === rowData)
        if (valueExist) {
			const filtered = selectedRowArray?.filter(
				(item: any) => item !== valueExist
			);
			return setselectedRowArray(filtered);
		} else {
			setselectedRowArray((prevState: any) => {
                // console.log("prev==", prevState)
                // console.log("new state==", rowData)
                return [...prevState, rowData]
            });
	    }
    }

    const activateCheckbox = ({rowData}: Props<B>) => {
        const valueExist = selectedRowArray?.find((item: any) => item === rowData)
        if (valueExist) {
            return true
        }
        else {
            return false
        }
    }
    
  return {selectedRowArray, selectSingleRow, selectAllRows, activateCheckbox}
}