import React from 'react'

const BorrowedBooks = () => {
  return (
    <div>
      <div>
        <h2 className="font-semibold text-2xl text-gray-800 mb-4">Borrowed Books</h2>
        <hr className="border-t border-gray-200 mb-6" />
        {/* Borrowed Books List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-300 rounded-md p-2 transition-shadow hover:shadow-md">
            <div>
            <h3 className="font-semibold text-lg text-gray-800">Book Title 1</h3>
            <p className="text-sm text-gray-600 mt-1">Author: Author Name</p>
            <p className="text-sm text-gray-600 mt-1">Due Date: 2023-10-30</p>
            </div>
            <div className="flex justify-center items-center"> 
            <button className='bg-green-700 text-white font-semibold py-2 px-8 rounded-md  hover:bg-green-800 transition duration-300'>
              Return
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BorrowedBooks