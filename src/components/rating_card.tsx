import React, { useState } from "react";
import Modal from "./modal"; // Adjust the path to your Modal component
import { Ratings } from "../requests/ratings_requests";
import useUser from "../requests/user_requests";

interface RatingCardProps {
  title: string;
  description: string;
  assignedTo: string;
  dueDate: Date;
  ratings: Ratings[];
}

const RatingCard: React.FC<RatingCardProps> = ({
  title,
  description,
  assignedTo,
  dueDate,
  ratings,
}) => {
  const { get_user_profile } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [assignedToName, setAssignedToName] = useState<string | null>(null);

  const calculateAverageRating = (ratings: Ratings[]) => {
    if (!ratings || ratings.length === 0) return "No ratings";
    const average =
      ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
    return average.toFixed(1);
  };

  const fetchUsername = async (id: string) => {
    try {
      const profile = await get_user_profile(id);
      setAssignedToName(profile.user.name);
    } catch (error) {
      console.error("Error fetching username:", error);
      setAssignedToName("Unknown User");
    }
  };

  const handleCardClick = async () => {
    await fetchUsername(assignedTo);
    setShowModal(true);
  };

  return (
    <>
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "20px",
          background: "#f0f8ff", // Lightest tint of blue
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
          width: "400px",
          height: "400px",
          fontFamily: "Montaga",
        }}
        onClick={handleCardClick}
        className="d-flex justify-content-between flex-column"
      >
        <h3
          style={{
            fontSize: "1.6rem",
            marginBottom: "10px",
            color: "#333",
            fontWeight: "bold",
          }}
        >
          {title}
        </h3>
        <p style={{ fontSize: "1rem", marginBottom: "15px", color: "#555" }}>
          {description}
        </p>
        <div style={{ fontSize: "0.9rem", color: "#666" }}>
          <p>
            <strong>Assigned to:</strong>{" "}
            {assignedToName || "Loading..."}
          </p>
          <p>
            <strong>Due date:</strong>{" "}
            {new Date(dueDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Average Rating:</strong> {calculateAverageRating(ratings)}
          </p>
        </div>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)} title={`Ratings for ${title}`}>
        {ratings.length > 0 ? (
          ratings.map((rating, index) => (
            <div
              key={index}
              style={{
                marginBottom: "15px",
                borderBottom: "1px solid #eee",
                paddingBottom: "10px",
                fontFamily: "pacifico"
              }}
            >
              <hr />
              <p>
                <strong>Employee:</strong> {rating.employee_id}
              </p>
              <p>
                <strong>Rating:</strong> {rating.rating}
              </p>
              <p>
                <strong>Comments:</strong> {rating.comments || "No comments"}
              </p>
            </div>
          ))
        ) : (
          <p style={{ fontFamily: "pacifico" }}>No ratings available.</p>
        )}
      </Modal>
    </>
  );
};

export default RatingCard;
