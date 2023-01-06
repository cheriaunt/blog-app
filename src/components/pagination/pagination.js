import classes from './pagination.module.scss';
import React, { useState } from 'react';
import {Pagination} from 'antd';


const PaginationEl = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const onChange = (page) => {
        console.log(page);
        setCurrentPage(page);
      };

    return (
    <div className={classes.pagination}>
         <Pagination current={currentPage} 
        onChange={onChange} total={25} />
    </div>
    )

};

export default PaginationEl;