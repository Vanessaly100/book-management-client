import React from 'react';

const Notification = () => {
  return (
    <div className="p-4">
      <main className="min-h-[90vh] bg-white rounded-md shadow-md p-6">
        <h2 className=" font-semibold text-2xl text-gray-800 mb-4">Notifications</h2>
        <hr className="border-t border-gray-200 mb-6" />

        {/* Notification List */}
        <div className="flex flex-col gap-4">
          <div className="border border-gray-300 rounded-md p-4 transition-shadow hover:shadow-md">
            <h3 className="font-semibold text-lg text-gray-800">Notification 1</h3>
            <p className="text-sm text-gray-600 mt-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>

          <div className="border border-gray-300 rounded-md p-4 transition-shadow hover:shadow-md">
            <h3 className="font-semibold text-lg text-gray-800">Notification 2</h3>
            <p className="text-sm text-gray-600 mt-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Notification;
