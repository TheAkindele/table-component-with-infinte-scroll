import { useInfiniteScroll } from 'customHooks/useinfinteScroll/useInfiniteScroll';
import React, {useState, useEffect, useCallback} from 'react'
import { Table } from './Table';
import axios from "axios"

type Props = {}

export const TableContainer = <T, > (props: Props) => {

    const [photos, setPhotos] = useState<T[]>([])
    const [loading, setLoading] = useState(false)


    const {setLastElement, pageNumber} = useInfiniteScroll()

    // console.log("table conatiner rendered<><>")

    const getPhotos =  useCallback(async (signal) => {
        setLoading(true)
        // console.log("available data<><><>", photos)
        await axios.get(
            `https://jsonplaceholder.typicode.com/photos?_page=${pageNumber}&_limit=30`,
            { signal: signal }
        )
        .then((res: any) => {
            let all = new Set([...photos, ...res?.data]);
            setPhotos([...all]);
            // console.log("useinfinteScroll data==", photos)
            setLoading(false);
        })
        .catch(err => console.log("axios err==", err))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumber])

    // useEffect(() => {
    //     const callData = async () => {
    //         await getPhotos()
    //     }
    //     callData()
    //      // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [pageNumber])

    useEffect(() => {
        let abortController: any
        (async () => {
            abortController = new AbortController();
             let signal = abortController.signal;    
            await getPhotos(signal)
        })()
        return () => abortController.abort();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumber])


    const columns = [
        {id: "id", label: "Product ID"},
        {id: "title", label: "Title" },
        {id: "url", label: "URL", width: "10rem" },
        {id: "thumbnailUrl", label: "Thumbnail" }
    ];

    
  return (
    <div style={{padding: "0 1rem 0 1rem", height: "98vh"}}>
        <div style={{maxHeight: "25vh"}}>
            <h2>This is a table component with infinite scroll feature </h2>
            <div>
                <h4>Table features</h4>
                <ul>
                    <li>Infinite scroll ability which mean the more you scroll down the table, the more it keep fetching more table data. Each data fetching returns 30 additional row of data.</li>
                    <li>Row selection - by clicking the check box of each row, you can select said row</li>
                    <li>All row secetion - by clicking the header checkbox, you can select every row of the table</li>
                </ul>
            </div>
        </div>
        <div style={{maxHeight: "74vh", boxSizing: "border-box"}}>
        <Table
            columns={columns}
            rows={photos}
            loading={loading}
            // onRowClick={}
            rowSelector={true}
            setLastElement={setLastElement}
        />
        </div>
    </div>
  )
}
