// En cada archivo dónde hagamos 
// la sintaxis especial de React (JSX)
// debemos importar la librería
import React from 'react'
import qs from 'query-string'
// Hacemos los componentes
// también podríamos importarlos desde archivos externos
// pero para efectos prácticos los crearé aquí mismo
const Entry = () => {
 return(
  <div>
   <h1>Entry</h1>
   <div>Entrada de al aplicación</div>
  </div>
 )
}

const Main = () => {
 return(
  <div>
   <h1>Main</h1>
   <div>Main de la aplicación</div>
  </div>
 )
}

const Other = () => {
 return(
  <div>
   <h1>Otra ruta</h1>
   <div>Aquí no hay nada</div>
  </div>
 )
}
// Exportamos un Array de items
// que cada uno contendrá un path
// es decir la dirección que le llegará en la petición
// y el componente que renderizará en esa dirección
// y una clave opcional que refiere si el componente
// se renderizará sólo cuando la dirección sea totalmente exacta
// además agregaremos una clave nosotros para hacer una pequeña
// barra de navegación, y que nos diriga a cada ruta
// en este ejemplo sólo usaremos tres rutas a los sumo
export default [{
 // Este equivaldría al punto de entrada de la aplicación
 // cómo si fuera nuestro index
 path: '/',
 exact: true,
 pathString: 'Inicio',
 component: Entry
}, {
 // Main de la aplicación
 path: '/main',
 pathString: 'Main',
 component: Main
}, {
 // Otra aplicación
 path: '/other',
 pathString: 'Otra Ruta',
 component: Other
}]
