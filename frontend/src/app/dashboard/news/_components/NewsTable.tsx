// News Table Component
"use client"
import React, { useState } from 'react'
import { Eye, Edit3, Trash2, Calendar, User, Tag } from 'lucide-react'
import { NewsItem } from '../page'
import Image from 'next/image'
import ViewDetails from './ViewDetails'
import EditNews from './EditNews'
import DeleteNews from './DeleteNews'
interface NewsTableProps {
  news: NewsItem[],
  path: string
}

const NewsTable: React.FC<NewsTableProps> = ({ news,path}:NewsTableProps) => {
    const [isModalOpen, setIsModalOpen] = useState<{ select: boolean; item: NewsItem | null }>({
      select: false,
      item: null,
    });
    const [isEditModelOpen, setIsEditModelOpen] = useState<{ select: boolean; item: NewsItem | null }>({ select: false, item: null });
    const [isDeleteModelOpen, setIsDeleteModelOpen] = useState<{ select: boolean; item: NewsItem | null }>({ select: false, item: null });

   if(isModalOpen?.select && isModalOpen?.item){
      return <ViewDetails item={isModalOpen?.item} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    }
    if(isEditModelOpen?.select && isEditModelOpen.item){
      return <EditNews  path={path}  item={isEditModelOpen.item} setIsEditModelOpen={setIsEditModelOpen} />
    }
    if(isDeleteModelOpen?.select && isDeleteModelOpen.item){
      return (
        <DeleteNews
          item={isDeleteModelOpen.item}
          isDeleteModelOpen={isDeleteModelOpen}
          setIsDeleteModelOpen={setIsDeleteModelOpen}
        />
      );
    }

  return (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              News
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Author
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {news.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center space-x-4">
                  {/* <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0"> */}
                    

                     <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_NEWS_BASE_URL}/${item.news_photo}`}
                      alt={item?.title}
                      width={48}
                      height={48}
                      className="h-12 border w-12 object-contain rounded-[50%] "
                     />
                  {/* </div> */}
                  <div className="flex-1 min-w-0">
                    <h4 className="w-64 leading-snug break-words line-clamp-3 text-ellipsis overflow-hidden">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500 truncate max-w-xs">
                      {item.description}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                  <Tag className="w-3 h-3 mr-1" />
                  {item.category}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.admin.name}</p>
                    <p className="text-xs text-gray-500">{item.admin.role}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(item.created_at).toLocaleDateString()}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsModalOpen({select:true, item})}
                    className="p-2 cursor-pointer text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                    title="View"
                  >
                    <Eye className="w-4 h-4" /> 
                  
                  </button>
                  <button
                    onClick={() => setIsEditModelOpen({select:true, item})}
                    className="p-2 cursor-pointer text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                    title="Edit"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsDeleteModelOpen({select:true, item})}
                    className="p-2 cursor-pointer text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)
}

export default NewsTable