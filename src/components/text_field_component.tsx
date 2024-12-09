import { useState, ChangeEvent, FC } from 'react';

interface TextFieldComponentProps {
  inputType?: 'text' | 'file' | 'password' | 'email'; // Support multiple input types
  width?: string; // Input width
  height?: string; // Input height
  placeholder?: string; // Placeholder text
  value?: string; // Controlled input value
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void; // Change handler
}

const TextFieldComponent: FC<TextFieldComponentProps> = ({
  inputType = 'text',
  width = '200px',
  height = '40px',
  placeholder = 'Enter text',
  value,
  onChange,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Handle file input changes and set the preview for images
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div style={{ position: 'relative', width }}>
      <input
        type={inputType}
        value={inputType === 'file' ? undefined : value} // Avoid setting `value` for file inputs
        onChange={inputType === 'file' ? handleFileChange : onChange}
        placeholder={placeholder}
        style={{
          width: '100%',
          height,
          padding: '10px',
          border: '2px solid #007bff',
          borderRadius: '5px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          outline: 'none',
          fontFamily: 'Montaga, sans-serif',
          fontSize: '1rem',
          transition: 'all 0.4s ease-in-out',
          position: 'relative',
        }}
        className="flashing-input"
        accept={inputType === 'file' ? '.jpg,.jpeg' : undefined} // Restrict file input to specific types
      />
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Image Preview"
          style={{
            position: 'absolute',
            top: '60%',
            left: '10px',
            transform: 'translateY(-50%)',
            maxWidth: '80%',
            maxHeight: '80%',
            borderRadius: '5px',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
};

// Adding CSS for animations dynamically
const styles = `
@keyframes flash-border {
  0% {
    border-color: #007bff;
  }
  50% {
    border-color: black;
  }
  100% {
    border-color: white;
  }
}

.flashing-input {
  animation: none;
}

.flashing-input:hover {
  animation: flash-border 1s infinite; /* Flash between #007bff and black on hover */
}

.flashing-input:focus {
  border-color: black; /* Solid black on focus */
  animation: none; /* Stop the flashing when focused */
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  transform: scale(1.05);
}
`;

// Append the styles to the document's head (if not already appended)
if (!document.getElementById('textfield-component-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.id = 'textfield-component-styles';
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

export default TextFieldComponent;
