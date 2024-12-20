import { useEffect, useState } from "react";
import { useAppContext } from "../../../context/context";
import { useEmployee } from "../../../requests/employee_requests";
import { Performance } from "../../../requests/performance_requests";
import useRatings, { Ratings } from "../../../requests/ratings_requests";
import PerformanceFormCard from "../../../components/performance_form_card";
import TextFieldComponent from "../../../components/text_field_component";
import PerformanceFormReview from "../../../components/form_review";
import { Toast } from "../../../components/toast_component";

const ReviewEvaluationForms: React.FC = () => {
  const { userId } = useAppContext(); // Get the current user ID from the context
  const { get_employee_performances } = useEmployee(); // Function to fetch performance forms
  const { createRating } = useRatings(); // Function to create ratings

  const [performanceForms, setPerformanceForms] = useState<Performance[]>([]); // Stores all performance forms
  const [filteredForms, setFilteredForms] = useState<Performance[]>([]); // Stores filtered forms
  const [selectedForm, setSelectedForm] = useState<Performance | null>(null); // Stores the currently selected form
  const [rating, setRating] = useState<Ratings>({
    performance_form: "",
    employee_id: "",
    rating: 0,
    comments: "",
  }); // Stores the user's rating
  const [filter, setFilter] = useState<string>(""); // Filter text input
  const [openModal, setOpenModal] = useState<boolean>(false); // Modal open state

  // Fetch performance forms on component mount
  useEffect(() => {
    const fetchPerformanceForms = async () => {
      if (userId) {
        const data = await get_employee_performances(userId);
        setPerformanceForms(data);
        setFilteredForms(data); // Initially, show all forms
      }
    };

    fetchPerformanceForms();
  }, [userId, get_employee_performances]);

  // Handle filtering
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
    setFilteredForms(
      performanceForms.filter((form) =>
        form.title.toLowerCase().includes(value)
      )
    );
  };

  // Handle form selection
  const handleFormSelect = (form: Performance) => {
    setSelectedForm(form);
    setRating((prev) => ({
      ...prev,
      performance_form: form.id!,
      employee_id: userId || "",
    }));
    setOpenModal(true); // Open the modal when form is selected
  };

  // Handle rating and review submission
  const handleSubmitReview = async (rate: number, comment: string, form: string) => {
    if (selectedForm) {
      if (rate < 1 || rate > 5) {
        Toast.warning("Please provide a rating between 1 and 5.")
        return;
      }
      const newRating: Ratings = {
        ...rating,
        rating: rate,
        comments: comment,
        employee_id: userId!,
        performance_form: form
      };
      await createRating(newRating);
      Toast.success("Review and rating submitted")
      setRating({ performance_form: "", employee_id: "", rating: 0, comments: "" }); // Reset rating
      setSelectedForm(null); // Reset selected form
      setOpenModal(false); // Close the modal after submission
    } else {
      Toast.warning("Please select a form before submitting your review.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ fontSize: "2.2rem", marginBottom: "2.5rem", color: "#333", fontFamily: "Montaga" }}>
        Review Evaluation Forms
      </h1>

      <div style={{ width: "100%", maxWidth: "600px", marginBottom: "2rem" }}>
        <TextFieldComponent
          placeholder="Filter Forms"
          value={filter}
          onChange={handleFilterChange}
          width="100%"
          height="50px"
        />
      </div>

      {/* Forms List Section */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          marginBottom: "3rem",
          zIndex: 0
        }}
      >
        {filteredForms.map((form) => (
          <PerformanceFormCard
            key={form.id}
            form={form}
            onClick={() => handleFormSelect(form)} // Trigger form selection
          />
        ))}
      </div>

      {/* Form Preview and Review Section */}
      {selectedForm && openModal && (
        <PerformanceFormReview
          selectedForm={selectedForm}
          onSubmitReview={handleSubmitReview}
          closeModal={() => setOpenModal(false)} // Add close modal handler
        />
      )}
    </div>
  );
};

export default ReviewEvaluationForms;
