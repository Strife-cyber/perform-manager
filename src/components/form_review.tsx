import React, { useState } from 'react';
import StandardModal from './standard_modal';
import TextFieldComponent from './text_field_component';
import StandardButton from './standard_button';

interface PerformanceFormReviewProps {
  selectedForm: {
    id?: string;
    title: string;
    description: string;
  };
  onSubmitReview: (rate: number, comment: string, form: string) => void;
  closeModal: () => void
}

const PerformanceFormReview: React.FC<PerformanceFormReviewProps> = ({
  selectedForm,
  onSubmitReview,
  closeModal
}) => {
  const [rating, setRating] = useState<number | null>(null);
  const [review, setReview] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  const handleSubmitReview = () => {
    if (rating && review) {
      onSubmitReview(rating, review, selectedForm.id!);
      setIsModalOpen(false); // Close modal after submission
      closeModal()
    }
  };

  return (
    <div style={{ fontFamily: "Montaga" }}>
      <StandardModal isOpen={isModalOpen} onClose={() => {setIsModalOpen(false); closeModal()}}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#333' }}>
          Review Form: {selectedForm.title}
        </h2>
        <p style={{ color: '#555', marginBottom: '1rem' }}>{selectedForm.description}</p>

        {/* Rating Input */}
        <div className='d-flex align-items-center' style={{ marginBottom: '1.5rem' }}>
          <label
            htmlFor="rating"
            style={{
              fontSize: '1rem',
              color: '#333',
              fontWeight: '500',
              marginBottom: '0.5rem',
              display: 'block',
            }}
          >
            Rating (1-5):
          </label>
          <div style={{marginLeft: "10px"}}>
            <TextFieldComponent inputType='number' placeholder='Enter Rating' value={rating || ''} onChange={(e) => setRating(Number(e.target.value))}/>
          </div>
        </div>

        {/* Review Input */}
        <div style={{ marginBottom: '2rem' }}>
          <textarea
            placeholder="Leave a review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            style={{
              width: '100%',
              height: '120px',
              padding: '0.8rem',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '1rem',
              resize: 'none',
              color: '#333',
            }}
          />
        </div>
        <div className='d-flex align-items-center justify-content-center'>
          <StandardButton placeholder='Submit' width='80%' onClickFunction={handleSubmitReview}/>
        </div>
      </StandardModal>
    </div>
  );
};

export default PerformanceFormReview;
