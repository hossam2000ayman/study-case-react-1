import CommentPage from "./components/CommentPage";

// function App() {
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     axios
//       .get("https://jsonplaceholder.typicode.com/todos")
//       .then((response) => {
//         setData(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   return <>{JSON.stringify(data)}</>;
// }

export default function App() {
  return (
    <>
      {/* <TodoPage /> */}
      <CommentPage />
    </>
  );
}
