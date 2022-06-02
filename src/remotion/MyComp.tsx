export const MyComp: React.FC<{ ticker: string }> = ({ ticker }) => {
  return (
    <div
      style={{
        fontSize: "100px",
      }}
    >
      Hello {ticker}!
    </div>
  );
};
