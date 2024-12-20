import React, { useEffect, useState } from "react";
import { useController } from "../../../requests/controller_requests";
import { Performance, usePerformance } from "../../../requests/performance_requests";
import { useAppContext } from "../../../context/context";
import RatingCard from "../../../components/rating_card";
import { Ratings } from "../../../requests/ratings_requests";

interface PerformanceData extends Performance {
  ratings: Ratings[];
}

const FeedbackPage: React.FC = () => {
  const { userId } = useAppContext();
  const { get_controller_performances } = useController();
  const { get_performance_ratings } = usePerformance();
  const [allPerformanceRatings, setAllPerformanceRatings] = useState<PerformanceData[]>([]);
  const [finalRating, setFinalRating] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataList: Performance[] = await get_controller_performances(userId!);
        const updatedDataList = await Promise.all(
          dataList.map(async (data) => {
            const ratingsList: Ratings[] = await get_performance_ratings(data.id!);
            return { ...data, ratings: ratingsList };
          })
        );

        setAllPerformanceRatings(updatedDataList);

        // Calculate the final rating
        const totalRatings = updatedDataList.reduce((acc, performance) => {
          const performanceTotal = performance.ratings.reduce((sum, rating) => sum + rating.rating, 0);
          return acc + performanceTotal;
        }, 0);

        const totalRatingCount = updatedDataList.reduce(
          (acc, performance) => acc + performance.ratings.length,
          0
        );

        const averageRating = totalRatingCount > 0 ? totalRatings / totalRatingCount : 0;
        setFinalRating(averageRating);
      } catch (error) {
        console.error("Error fetching performance data:", error);
      }
    };

    fetchData();
  }, [userId, get_controller_performances, get_performance_ratings]);

  return (
    <div style={styles.pageWrapper}>
      <h1 style={styles.heading}>Feedback Page</h1>
      {allPerformanceRatings.length > 0 ? (
        <>
          <div style={styles.cardContainer}>
            {allPerformanceRatings.map((performance) => (
              <RatingCard
                key={performance.id}
                title={performance.title}
                description={performance.description}
                assignedTo={performance.assigned_to}
                dueDate={performance.due_date}
                ratings={performance.ratings}
              />
            ))}
          </div>
          <div style={styles.finalRatingContainer}>
            <p style={styles.finalRatingText}>
              Final Rating: <span style={styles.ratingValue}>{finalRating.toFixed(2)}</span>
            </p>
          </div>
        </>
      ) : (
        <p style={styles.loadingText}>Loading feedback...</p>
      )}
    </div>
  );
};

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "#F8F8F8",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
    fontFamily: "'montaga', sans-serif",
    boxSizing: "border-box",
  } as React.CSSProperties,
  heading: {
    fontSize: "2.5rem",
    marginBottom: "2rem",
    textAlign: "center",
    color: "#333",
    fontWeight: "bold",
  } as React.CSSProperties,
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1.5rem",
    justifyContent: "center",
    maxWidth: "1200px",
    width: "100%",
  } as React.CSSProperties,
  loadingText: {
    fontSize: "1.2rem",
    textAlign: "center",
    color: "#666",
    marginTop: "2rem",
  } as React.CSSProperties,
  finalRatingContainer: {
    marginTop: "2rem",
    textAlign: "center",
    backgroundColor: "#FFF",
    padding: "1rem 2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  } as React.CSSProperties,
  finalRatingText: {
    fontSize: "1.5rem",
    color: "#333",
  } as React.CSSProperties,
  ratingValue: {
    fontWeight: "bold",
    color: "#4CAF50",
  } as React.CSSProperties,
};

export default FeedbackPage;
