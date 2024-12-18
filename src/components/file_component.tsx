import React, { useState, DragEvent } from "react";
import "./components.css";

interface FileObject extends File {
  id: string; // Optional: Unique identifier for each file
}

interface FileComponentProps {
  onFilesUploaded: (files: File[]) => void;
}

const FileComponent: React.FC<FileComponentProps> = ({ onFilesUploaded }) => {
  const [files, setFiles] = useState<FileObject[]>([]);
  const [isUploading] = useState<boolean>(false);

  const handleDrop = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    const uploadedFiles = Array.from(event.dataTransfer.files).map((file) =>
      Object.assign(file, { id: URL.createObjectURL(file) })
    );
    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
    onFilesUploaded(uploadedFiles);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedFiles = Array.from(event.target.files || []).map((file) =>
      Object.assign(file, { id: URL.createObjectURL(file) })
    );
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    onFilesUploaded(selectedFiles);
  };

  return (
    <div
      className="filemanager-container card"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="fm-content-wrapper">
        <div className="fp-content">
          {files.length === 0 ? (
            <div className="fm-empty-container">
              <label htmlFor="file-input" className="dndupload-message">
                Vous pouvez glisser des fichiers ici pour les ajouter ou cliquer pour en sélectionner.
                <div className="dndupload-arrow d-flex">
                  <i className="fa fa-arrow-circle-o-down fa-3x m-auto"></i>
                </div>
              </label>
              <input
                id="file-input"
                type="file"
                multiple
                style={{ display: "none" }}
                onChange={handleFileSelect}
              />
            </div>
          ) : (
            <div className="fp-iconview">
              {files.map((file) => (
                <div className="fp-file fp-hascontextmenu" key={file.id}>
                  <a href="#" className="d-block aabtn">
                    <div style={{ position: "relative" }}>
                      <div
                        className="fp-thumbnail"
                        style={{ width: "110px", height: "110px" }}
                      >
                        <img
                          title={file.name}
                          alt={file.name}
                          src="https://moodle.icam-afrique.com/theme/image.php/trema/core/1727079786/f/document"
                          style={{ maxWidth: "90px", maxHeight: "90px" }}
                        />
                      </div>
                    </div>
                    <div className="fp-filename-field">
                      <div
                        className="fp-filename text-truncate"
                        style={{ width: "112px" }}
                      >
                        {file.name}
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
        {isUploading && (
          <div className="dndupload-uploadinprogress">
            <i
              className="icon fa fa-circle-o-notch fa-spin fa-fw"
              aria-hidden="true"
            ></i>
            <span className="sr-only">Chargement…</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileComponent;
