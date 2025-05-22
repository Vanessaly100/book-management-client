import React, { useEffect, useState } from "react";
import { getMyReservations } from "../../../api/reservationApi"; // adjust path as needed

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getMyReservations();
        setReservations(Array.isArray(data?.reservations) ? data.reservations : []);

      } catch (err) {
        setError(err?.message || "Failed to load reservations");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  if (loading) return <p>Loading reservations...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">My Reservations</h2>

      {reservations.length === 0 ? (
        <p className="text-gray-600">No reservations available.</p>
      ) : (
        <div className="space-y-4">
          {reservations.map((res) => (
            <div
              key={res.reservation_id}
              className="border p-4 rounded-md bg-white shadow-sm"
            >
              <p className="font-semibold text-lg">{res.book?.title || "Untitled Book"}</p>
              <p className="text-sm text-gray-600">
                Reserved on: {new Date(res.createdAt).toLocaleDateString()}
              </p>
              {/* Add more reservation details here as needed */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reservations;
