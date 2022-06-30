import React from 'react';
import { ArticleHistory } from '@@types/Article';
import { PrimaryButton } from '@components/common/Button';

export default function ArticleSidebar({
  articleHistory,
  restoreHistory,
}: {
  articleHistory: ArticleHistory[] | null;
  restoreHistory: (historyId: string, articleId: string) => void;
}) {
  return (
    <>
      <div className='px-4 w-2/5'>
        <div className='border rounded-lg pb-6 border-gray-200'>
          <div className='flex items-center border-b border-gray-200 justify-between px-6 py-3'>
            <p className='text-sm lg:text-xl font-semibold leading-tight text-gray-800'>
              Article's Edit History
            </p>
          </div>
          <div className='px-6 pt-6 overflow-x-auto'>
            <table className='w-full whitespace-nowrap'>
              <tbody>
                {articleHistory &&
                  articleHistory.map((h) => (
                    <tr key={h._id}>
                      <td>
                        <div className='flex items-center py-4 my-2'>
                          <div className='w-10 h-10 bg-gray-700 rounded-sm flex items-center justify-center'>
                            <p className='text-xs font-bold leading-3 text-white'>
                              {h.title.substring(0, 3).toUpperCase()}
                            </p>
                          </div>
                          <div className='pl-3'>
                            <div className='flex items-center text-sm leading-none'>
                              <p className='font-semibold text-gray-800'>
                                {h.title}
                              </p>
                              <p className='text-blue-500 ml-3'>
                                {new Date(h.createdAt).toDateString()}
                              </p>
                            </div>
                            <div
                              className='text-xs md:text-sm leading-none text-gray-600 mt-2'
                              dangerouslySetInnerHTML={{
                                __html: h.description.substring(0, 50),
                              }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className='pl-16'>
                        <div>
                          <p className='text-sm font-semibold leading-none text-right text-gray-800'>
                            <PrimaryButton
                              title='Restore'
                              type='submit'
                              onClick={() => restoreHistory(h._id, h.articleId)}
                            />
                          </p>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
