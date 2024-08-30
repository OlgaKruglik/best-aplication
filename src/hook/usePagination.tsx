import { useState, useCallback } from 'react';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
    }

type DataType = {
    id: number;
    name: string;
    };

function usePagination(data: Post[], itemsPerPage: number) {
    const [currentPage, setCurrentPage] = useState(1);
        
    const setCurrentPageWithNavigation = useCallback((page: number) => {
        setCurrentPage(page);
    }, []);



    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

return { currentItems, currentPage, setCurrentPageWithNavigation };
}

export default usePagination
