import { API } from "@config/axios";
import React from "react";
import { Link } from "react-router-dom";
import { Article } from "@@types/Article";

export default function PopularArticles() {
  const [popularArticles, setPopularArticles] = React.useState<Article[]>([]);

  async function getPopularArticles() {
    const res = await API.get(`/popular-articles`);
    setPopularArticles(res.data);
  }

  React.useEffect(() => {
    getPopularArticles();
  }, []);

  return (
    <>
      <div className="">
        <div className="border rounded-lg pb-6 border-gray-200">
          <div className="flex items-center border-b border-gray-200 justify-between px-6 py-3"></div>
          <div className="px-6 pt-6 overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <tbody>
                {popularArticles &&
                  popularArticles.map((h) => (
                    <tr key={h._id}>
                      <Link to={`/article/${h.slug}`}>
                        <td>
                          <div className="flex items-center py-4 my-2">
                            <div className="w-10 h-10 bg-gray-700 rounded-sm flex items-center justify-center">
                              <p className="text-xs font-bold leading-3 text-white">
                                {h.title.substring(0, 3).toUpperCase()}
                              </p>
                            </div>
                            <div className="pl-3">
                              <div className="flex items-center text-sm leading-none">
                                <p className="font-semibold text-gray-800">
                                  {h.title}
                                </p>
                                <p className="text-blue-500 ml-3">
                                  {h.createdAt &&
                                    new Date(h.createdAt).toDateString()}
                                </p>
                              </div>
                              <div
                                className="text-xs md:text-sm leading-none text-gray-600 mt-2"
                                dangerouslySetInnerHTML={{
                                  __html: h.description.substring(0, 50),
                                }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="pl-16">
                          <div></div>
                        </td>
                      </Link>
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
