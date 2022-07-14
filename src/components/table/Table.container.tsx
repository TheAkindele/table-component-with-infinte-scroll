import { useInfiniteScroll } from 'customHooks/useinfinteScroll/useInfiniteScroll';
import React, {useState, useEffect, useCallback} from 'react'
import { Table } from './Table';
import axios from "axios"

type Props = {}

export const TableContainer = React.memo((props: Props) => {

    const [photos, setPhotos] = useState<any>([])
    const [loading, setLoading] = useState(false)


    const {setLastElement, pageNumber} = useInfiniteScroll()

    // console.log("table conatiner rendered<><>")

    const getPhotos =  useCallback(async () => {
        setLoading(true)
        console.log("available data<><><>", photos)
        await axios.get(
            `https://jsonplaceholder.typicode.com/photos?_page=${pageNumber}&_limit=30`
        )
        .then((res: any) => {
            let all = new Set([...photos, ...res?.data]);
            console.log("new data-----", res?.data)
            console.log("set======", all)
            setPhotos([...all]);
            // console.log("useinfinteScroll data==", photos)
            setLoading(false);
        })
        .catch(err => console.log("axios err==", err))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumber])

    useEffect(() => {
        const callData = async () => {
            await getPhotos()
        }
        callData()
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumber])


    const columns = [
        {id: "id", label: "Product ID"},
        {id: "title", label: "Title" },
        {id: "url", label: "URL", width: "10rem" },
        {id: "thumbnailUrl", label: "Thumbnail" }
    ];

    
  return (
    <div>
        <Table
            columns={columns}
            rows={photos}
            loading={loading}
            onRowClick={(row: any) => alert(<Alert row={row} />)}
            rowSelector={true}
            setLastElement={setLastElement}
        />
    </div>
  )
})

const Alert = (row: any) => (
    <div>
        <p>{row.title}</p>
        <p>{row.thumbnailUrl}</p>
    </div>
)