import React from 'react';
import { Article } from '@@types/Article';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import * as ActionTypes from '@constants/actionTypes';

interface TableProps {
  title: string;
  data: Array<Article>;
  listItems: Record<string, string>[];
}

const Table = ({ title, data, listItems }: TableProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getKeyValue = (key: string, data: Record<string, any>) => {
    return data[key];
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: ActionTypes.Article.DELETE_ARTICLE, payload: id });
      }
    });
  };

  return (
    <div className='w-full'>
      <div className='mx-auto container bg-white dark:bg-gray-800 shadow rounded'>
        <div className='flex flex-col lg:flex-row p-4 lg:p-8 justify-end lg:items-stretch mr-10 pr-5 '>
          <div className='flex flex-row items-end w-full border-t p-5 '>
            <div className=' border-gray-300 dark:border-gray-200 py-3 lg:py-0 lg:px-6 w-full text-xl font-bold'>
              {title}
            </div>

            <div className='lg:ml-6 flex items-center'>
              <div
                className='text-white ml-4 cursor-pointer focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 w-8 h-8 rounded flex items-center justify-center'
                onClick={() => navigate('/admin/articles/create')}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='icon icon-tabler icon-tabler-plus'
                  width={28}
                  height={28}
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path stroke='none' d='M0 0h24v24H0z' />
                  <line x1={12} y1={5} x2={12} y2={19} />
                  <line x1={5} y1={12} x2={19} y2={12} />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full overflow-x-scroll xl:overflow-x-hidden'>
          <table className='min-w-full bg-white dark:bg-gray-800'>
            <thead>
              <tr className='w-full h-16 border-gray-300 dark:border-gray-200 border-b py-8'>
                <th className='pl-8 text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4'></th>
                {listItems &&
                  listItems.map((item) => (
                    <th
                      className='text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4'
                      key={item.key}
                    >
                      {item.title}
                    </th>
                  ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.length > 0 &&
                data.map((article, index) => (
                  <tr
                    className='h-24 border-gray-300 dark:border-gray-200 border-b'
                    key={index}
                  >
                    <td className='pl-8 pr-6 text-left whitespace-no-wrap text-sm text-gray-800 dark:text-gray-100 tracking-normal leading-4'></td>
                    {listItems &&
                      listItems.map((item) => (
                        <td
                          className='text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4'
                          key={`${item.key}-td`}
                        >
                          {getKeyValue(item.key, article)}
                        </td>
                      ))}
                    <td>
                      <Link to={`/admin/articles/${article.slug}`}>
                        <svg
                          className='inline'
                          viewBox='0 0 20 20'
                          width={40}
                          height={30}
                        >
                          <path d='M10,6.978c-1.666,0-3.022,1.356-3.022,3.022S8.334,13.022,10,13.022s3.022-1.356,3.022-3.022S11.666,6.978,10,6.978M10,12.267c-1.25,0-2.267-1.017-2.267-2.267c0-1.25,1.016-2.267,2.267-2.267c1.251,0,2.267,1.016,2.267,2.267C12.267,11.25,11.251,12.267,10,12.267 M18.391,9.733l-1.624-1.639C14.966,6.279,12.563,5.278,10,5.278S5.034,6.279,3.234,8.094L1.609,9.733c-0.146,0.147-0.146,0.386,0,0.533l1.625,1.639c1.8,1.815,4.203,2.816,6.766,2.816s4.966-1.001,6.767-2.816l1.624-1.639C18.536,10.119,18.536,9.881,18.391,9.733 M16.229,11.373c-1.656,1.672-3.868,2.594-6.229,2.594s-4.573-0.922-6.23-2.594L2.41,10l1.36-1.374C5.427,6.955,7.639,6.033,10,6.033s4.573,0.922,6.229,2.593L17.59,10L16.229,11.373z'></path>
                        </svg>
                      </Link>
                      <Link to={`/admin/articles/${article.slug}/edit`}>
                        <svg
                          className='inline'
                          xmlns='http://www.w3.org/2000/svg'
                          enableBackground='new 0 0 24 24'
                          height='24'
                          viewBox='0 0 24 24'
                          width='24'
                        >
                          <g>
                            <rect fill='none' height='24' width='24' />
                          </g>
                          <g>
                            <g>
                              <rect height='4' width='4' x='10' y='4' />
                              <rect height='4' width='4' x='4' y='16' />
                              <rect height='4' width='4' x='4' y='10' />
                              <rect height='4' width='4' x='4' y='4' />
                              <polygon points='14,12.42 14,10 10,10 10,14 12.42,14' />
                              <path d='M20.88,11.29l-1.17-1.17c-0.16-0.16-0.42-0.16-0.58,0L18.25,11L20,12.75l0.88-0.88C21.04,11.71,21.04,11.45,20.88,11.29z' />
                              <polygon points='11,18.25 11,20 12.75,20 19.42,13.33 17.67,11.58' />
                              <rect height='4' width='4' x='16' y='4' />
                            </g>
                          </g>
                        </svg>
                      </Link>
                      <a
                        href='#'
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(article._id);
                        }}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          height='24'
                          viewBox='0 0 24 24'
                          width='24'
                          className='inline'
                        >
                          <path d='M0 0h24v24H0z' fill='none' />
                          <path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z' />
                        </svg>
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Table;
