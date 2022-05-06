export const MyComp: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div
      style={{
        fontSize: "100px",
      }}
    >
      Hello {text}!
    </div>
  );
};
