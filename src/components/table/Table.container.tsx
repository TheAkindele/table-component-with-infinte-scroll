import { useInfiniteScroll } from 'customHooks/useinfinteScroll/useInfiniteScroll';
import React, {useState, useEffect} from 'react'
import { Table } from './Table';
import axios from "axios"

type Props = {}

export const TableContainer = (props: Props) => {
    const [click, setclick] = React.useState<any>()

    const [photos, setPhotos] = useState<any>([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)

    const nextPage = () => setPage(page + 1)

    const getPhotos = async () => {
        setLoading(true)
        await axios.get(
            `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=30`
        )
        .then((res: any) => {
            let all = new Set([...photos, ...res?.data]);
            setPhotos([...all]);
            console.log("useinfinteScroll data==", photos)
            setLoading(false);
        })
        .catch(err => console.log("axios err==", err))
    }

    useEffect(() => {
        const callData = async () => {
            await getPhotos()
        }
        callData()
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])



    const columns = [
        {id: "id", label: "Product ID"},
        {id: "title", label: "Title" },
        {id: "url", label: "URL", width: "10rem" },
        {id: "thumbnailUrl", label: "Thumbnail" }
    ];

    const {setLastElement} = useInfiniteScroll({page, nextPage})

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
}

const Alert = (row: any) => (
    <div>
        <p>{row.title}</p>
        <p>{row.thumbnailUrl}</p>
    </div>
)