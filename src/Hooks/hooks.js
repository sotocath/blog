import React, { useState } from "react";


export const usePagination = (data, cnt) => {
    const [currentPage, setCurrentPage] = useState(1);
    const maxPage = Math.ceil(data.length / cnt);

    function current() {
        const start = (currentPage - 1) * cnt;
        const end = start + cnt;
        return data.slice(start, end);
    }
    function jump(page) {
        if (page < 1) {
            page = 1;
        } if (page > maxPage) {
            page = maxPage;
        }
        setCurrentPage(page);

    }

    return { currentPage, maxPage, current, jump };
}
