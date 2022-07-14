import {useState, useEffect, useRef} from "react"

interface IScroll {}

export const useInfiniteScroll = () => {
    const [pageNumber, setPageNumber] = useState(1)
    const [lastElement, setLastElement] = useState(null);


    const observer = useRef(
		new IntersectionObserver((entries) => {
			const first = entries[0];
			if (first.isIntersecting) {
                setPageNumber((e: number) => e + 1)
			}
		})
	);

    useEffect(() => {
		const currentElement = lastElement;
		const currentObserver = observer?.current;

		if (currentElement) {
			currentObserver.observe(currentElement);
		}

		return () => {
			if (currentElement) {
				currentObserver.unobserve(currentElement);
			}
		};
	}, [lastElement]);

    return {setLastElement, pageNumber}
}




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