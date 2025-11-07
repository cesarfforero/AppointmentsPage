1) Para iniciar un proyecto en React, desde el front vamos a seguir los siguientes pasos:
2) Dentro de la carpeta Front, escribir el comando npm create vite@latest. Ahi me va a preguntar por un nombre, recomendado: "vite-project". Después en select a framework seleccionar REACT. Después en Select a variant seleccione: Javascript. Después seleccionar "NO" en use rolldown-vite (experimental) y por ultimo, oprimir "YES" en install with npm and start now ?

3) De ahora en adelante para entrar a la carpeta y poder trabajar, se debe entrar a la carpeta front "cd front" y después a "cd vite-project"

para inicializar el projecto, escribir en la terminal: "npm run dev". Una vez hecho esto vamos a encontrar una pagina web con los logos de react y vite, un contador, etc. BORRARLO

4) Para borrar ese contenido inicial, ir a la carpeta SRC y entrar al archivo de App.jsx. Ahí borrar todo lo que esta dentro del container <div> y dejar la estructura de la siguiente manera: 

function App() {
  

  return (
    <>
       <h1>Hola Mundo</h1>
    </>
  )
}

export default App


EN TERMINOS GENERALES, BORRAR TODO MENOS LO QUE ESTÁ ARRIBA ESCRITO EN ESTE DOCUMENTO. 

BORRAR TAMBIEN EL ARCHIVO index.css y App.css Y EL ARCHIVO REACT.SVG QUE ESTÁ ADENTRO DE assets

POR ULTIMO BORRAR: import './index.css'   DE LA CARPETA DE "main.jsx"

5) Dentro de SRC crear carpeta: "components" y una carpeta "views"

6) Adentro de de vies crear otra carpeta que se llame "home" y adentro de home crear un archivo que se llame "Home.jsx" y Home.module.css

7) dentro de la carpeta "home" y dentro del archivo "home.jsx" escribir: 

function Home() {
  return (
    <>
      <h1>home</h1>
    </>
  );
}

export default Home;


8) Dentro de la carpeta de component, crear una carpeta que se llame "Navbar" y adentro crear un archivo "Navbar.jsx"

dentro de Navbar.jsx, escribir: 

function Navbar (){

}

export default Navbar.


9) En el archivo Home.jsx, debajo de <h1>HOME </H1> ESCRIBIR: <Navbar />. el archivo debería verse así: 

import Navbar from "../../components/Navbar/Navbar";

function Home() {
  return (
    <>
      <h1>home</h1>
    <Navbar />
    </>
  );
}

export default Home;

10) En el archivo de App.jsx escrbir <Home /> debajo de <h1>Hola Mundo</h1>. El archivo debería verse así: 

import Home from "./views/Home/Home"

function App() {
  

  return (
    <>
       <h1>Hola Mundo</h1>
       <Home /> 
    </>
  )
}

export default App