import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import avatarPlaceholder from "../../../assets/gray-user-profile-icon-png-fP8Q1P.png";

export default function UserDetailsModal({ isOpen, onClose, user }) {
  if (!user) return null;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto p-4">
          <div className="mx-auto max-w-3xl bg-white p-6 rounded-2xl shadow-lg">
            <Dialog.Title className="text-xl font-semibold mb-4">
              {user.first_name} {user.last_name}'s Profile
            </Dialog.Title>
            <div className="flex items-center justify-around">
              <div className="mb-4">
                <img
                  src={user?.profile_picture_url || avatarPlaceholder}
                  alt="Avatar"
                  className="w-28 h-28 rounded-full object-cover"
                />
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Phone Number:</strong> {user.phone_number}
                </p>
                <p>
                  <strong>Location</strong>
                  {user.location}
                </p>
                <p>
                  <strong>Reading_Preferences</strong>
                  {user.reading_preferences}
                </p>
                <p>
                  <strong>Points:</strong> {user.points}
                </p>
                <p>
                  <strong>Rewarded :</strong> {user.rewarded}
                </p>
                <p>
                  <strong>Membership:</strong> {user.membership_type}
                </p>
              </div>
              <div className="">
                <div className="mb-4">
                  <h3 className="font-bold">Borrowed Books:</h3>
                  {user.borrows?.length > 0 ? (
                    <ul className="list-disc ml-5">
                      {user.borrows.map((b) => (
                        <li key={b.borrow_id}>{b.book?.title}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No borrowed books.</p>
                  )}
                </div>

                <div>
                  <h3 className="font-bold">Reservations:</h3>
                  {user.reservations?.length > 0 ? (
                    <ul className="list-disc ml-5">
                      {user.reservations.map((r) => (
                        <li key={r.reservation_id}>{r.book?.title}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No reservations.</p>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-6 text-right">
              <button
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
