import {useState, useEffect, useRef} from "react"


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



