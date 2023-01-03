import classes from './pagination.module.scss';
import React, { useState } from 'react';
import {Pagination} from 'antd';
import withClass from '../../hoc/withClass';


const PaginationEl = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const onChange = (page) => {
        console.log(page);
        setCurrentPage(page);
      };

    return (
    <>
         <Pagination current={currentPage} 
        onChange={onChange} total={50} />
    </>
    )

};

export default withClass(PaginationEl,classes.pagination);