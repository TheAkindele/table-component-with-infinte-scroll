import {useState, useEffect, useRef} from "react"
import axios from "axios"

interface IScroll {
   //  apiFunction: () => Promise<void>
    page: number
    nextPage: Function
}

export const useInfiniteScroll = ({page, nextPage }: IScroll) => {
    // const [photos, setPhotos] = useState<any>([])
    // const [loading, setLoading] = useState(false)
    // const [page, setPage] = useState(1)
    const [lastElement, setLastElement] = useState(null);

   //  console.log("page==", page)

    const observer = useRef(
		new IntersectionObserver((entries) => {
			const first = entries[0];
			if (first.isIntersecting) {
				nextPage();
			}
		})
	);

    // const getPhotos = async () => {
    //     setLoading(true)
    //     await axios.get(
    //         `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=30`
    //     )
    //     .then((res: any) => {
    //         let all = new Set([...photos, ...res?.data]);
    //         setPhotos([...all]);
    //         console.log("useinfinteScroll data==", photos)
    //         setLoading(false);
    //     })
    //     .catch(err => console.log("axios err==", err))
    // }
    

    // useEffect(() => {
    //     const callData = async () => {
    //         await apiFunction()
    //     }
    //     callData()
    //      // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [page])

    useEffect(() => {
		const currentElement = lastElement;
		const currentObserver = observer?.current;

		if (currentElement) {
            console.log("currentElement--", currentElement)
			currentObserver.observe(currentElement);
		}

		return () => {
			if (currentElement) {
				currentObserver.unobserve(currentElement);
			}
		};
	}, [lastElement]);
    // console.log("ref current==", observer.current)

    return {setLastElement}
}