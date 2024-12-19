import { useEffect, useState } from "react";
import { Employee, useEmployee } from "../../../requests/employee_requests";
import useUser from "../../../requests/user_requests";
import FloatingButton from "../../../components/floating_button";
import Modal from "../../../components/modal";
import FormGroup from "../../../components/form_group";
import DatePicker from "react-datepicker";
import FileComponent from "../../../components/file_component"; // Import the FileManager component
import "react-datepicker/dist/react-datepicker.css";
import StandardButton from "../../../components/standard_button";
import useFile from "../../../requests/file_requests";
import { Performance, usePerformance } from "../../../requests/performance_requests";
import { useAppContext } from "../../../context/context";
import { Toast } from "../../../components/toast_component";

const CreateEvaluationForm: React.FC = () => {
  const { uploadFile } = useFile();
  const { userId } = useAppContext();
  const { get_user_profile } = useUser();
  const { get_all_employees } = useEmployee();
  const { create_performance } = usePerformance();

  const [showModal, setShowModal] = useState(false);
  const [formTitle, setFormTitle] = useState<string>("");
  const [selectedEmployees, setSelectedEmployees] = useState<any | null>(null);
  const [evaluationCriteria, setEvaluationCriteria] = useState<string>("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [employeeList, setEmployeeList] = useState<any[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]); // State to handle uploaded files

  // Fetch employees and their profiles
  useEffect(() => {
    const fetchEmployees = async (): Promise<void> => {
      try {
        const employees = await get_all_employees();
        const employeeWithNames = await Promise.all(
          employees.map(async (employee: Employee) => {
            const profile = await get_user_profile(employee.user_id);
            return { ...employee, name: profile.user.name };
          })
        );
        setEmployeeList(employeeWithNames);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleFileUpload = (files: File[]): void => {
    setUploadedFiles(files);
    console.log("Uploaded files:", files);
  };

  const assignForm = async (): Promise<void> => {
    if (!uploadedFiles.length) {
      Toast.warning("No files uploaded!");
      return;
    }

    if (!selectedEmployees) {
      Toast.warning("No employee selected!")
      return;
    }

    try {
      const uploaded = await uploadFile(uploadedFiles[0]);
      const filepath = uploaded.path;

      const performance: Performance = {
        title: formTitle,
        description: evaluationCriteria,
        path: filepath,
        created_by: userId?.toString() || "",
        assigned_to: selectedEmployees.user_id,
        due_date: dueDate || new Date(),
      };

      await create_performance(performance);
      Toast.success(`Performance evaluation created: ${performance}`)
      setShowModal(false); // Close modal after successful submission
    } catch (error) {
      console.error("Error creating performance evaluation:", error);
    }
  };

  return (
    <>
      <FloatingButton title="Create Evaluation Form" onClick={() => setShowModal(true)} />
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <FormGroup label="Title">
          <input
            type="text"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </FormGroup>
        <FormGroup label="Select Employee">
          <select
            onChange={(e) =>
              setSelectedEmployees(employeeList.find((emp) => emp.user_id == e.target.value))
            }
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          >
            <option value="">Select Employees</option>
            {employeeList.map((employee) => (
              <option key={employee.user_id} value={employee.user_id}>
                {employee.name}
              </option>
            ))}
          </select>
          {selectedEmployees && (
            <ul>
              <li key={selectedEmployees.user_id}>{selectedEmployees.name}</li>
            </ul>
          )}
        </FormGroup>
        <FormGroup label="Evaluation Criteria">
          <textarea
            value={evaluationCriteria}
            onChange={(e) => setEvaluationCriteria(e.target.value)}
            rows={3}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </FormGroup>
        <FormGroup label="Due Date">
          <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} />
        </FormGroup>
        <FormGroup label="Upload Files">
          <FileComponent onFilesUploaded={handleFileUpload} /> {/* Pass callback for file uploads */}
        </FormGroup>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "20px" }}>
          <StandardButton
            placeholder="Close"
            onClickFunction={() => setShowModal(false)}
            color="#00FFFF"
            darkerColor="#008B8B"
          />
          <StandardButton
            placeholder="Assign"
            onClickFunction={assignForm}
            color="#A8D5BA"
            darkerColor="#2E8B57"
          />
        </div>
      </Modal>
    </>
  );
};

export default CreateEvaluationForm;
