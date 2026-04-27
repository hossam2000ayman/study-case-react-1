import CommentPage from "./components/CommentPage";
import TodoPage from "./components/TodoPage";

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
    <main>
      <TodoPage />
      <hr />
      <CommentPage />
    </main>
  );
}
