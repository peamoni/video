export const MyComp: React.FC<{ ticker: string }> = ({ ticker }) => {
  return (
    <div
      style={{
        fontSize: "100px",
        backgroundColor: "red",
      }}
    >
      Hello {ticker}!
    </div>
  );
};
