import useTheme from "../hooks/theme/useTheme";

const App = () => {
  const { handleTheme } = useTheme();

  return (
    <div>
      도담도담 <button onClick={handleTheme}>테마 바꾸기</button>
    </div>
  );
};

export default App;
