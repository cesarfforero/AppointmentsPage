import { Route } from "express"
import Home from "./views/Home/Home"
import MisTurnos from "./views/Home/Mis turnos/MisTurnos"
import { useEffect } from "react";

function App() {

  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if(!isLogged && location.pathname !=== "/login" && location.pathname !== "/register") {
      navigate("/login");
    }
  }, [])
  

  return (
    <>
    <nav>
      <ul>
        <link to="/">Home</link>
        <link to="/login">Login</link>
        <link to="/register">Register</link>
        <link to="/mis-turnos">Mis Turnos</link>
      </ul>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/mis-turnos" element={<MisTurnos />} />
    </Routes>
    </>
  )
}

export default App
