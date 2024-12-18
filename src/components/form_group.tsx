const FormGroup = ({
    label,
    children,
    style,
  }: {
    label?: string;
    children: React.ReactNode;
    style?: React.CSSProperties;
  }) => {
    return (
      <div style={{ marginBottom: "15px", ...style, fontSize: "14px", fontFamily: "Montaga" }}>
        {label && <label style={{ display: "block", marginBottom: "5px" }}>{label}</label>}
        {children}
      </div>
    );
  };

export default FormGroup;