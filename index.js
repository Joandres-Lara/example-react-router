// Importamos las librerías de React
import React from 'react'
import ReactDOM from 'react-dom/server'
import http from 'http'
import express from 'express'

// Importamos los componentes
// necesarios de React Router
import { StaticRouter } from 'react-router'
import { Route, Link } from 'react-router-dom'

// Importamos nuestras rutas
import routes from './routes'

const app = express()
// Modificamos la aplicación
// para que maneje nuestras rutas
const App = () => {
 return(
  <div>
   {
    // Vamos a hacer también una pequeña barra de navegación
   }
   <ul>
    {
     routes.filter(route => !!route.pathString).map( (route, i) => {
      return (
       <li key={i}><Link to={route.path}>{ route.pathString }</Link></li>
      )
     })
    }
   </ul>
   {
    // Por cada ruta vamos a necesitar un componente que 
    // decidirá cuando se verá
    routes.map((route, i) => {
     return (
      <Route path={route.path} component={route.component} key={i} exact={route.exact}/>
     )
    })
   }
  </div>
 )
}

app.get('*', function(request, response){
 // Creamos el template string de la aplicación
 const { url } = request
 // El contexto, refiere a si queremos pasar algún parámetro de
 // la petición como un usuario o alguna petición que quiera saber
 // es un parámetro obligatorio, al igual que location,
 // que al pasarle la localización de la url de petición del servidor
 // le estamos pasando exactamente la dirección después del nombre
 // de nuestro dominio, por eso he cambiado / esto por * esto
 // en Express, además de definir las rutas, literales, también
 // puedes usar expresiones regulares. * significa todas las peticiones
 // de tipo GET y el contexto sólo será un objeto vacío, no nos interesa 
 // pasarle nada
 const context = {}
 // Lo agregamos a la aplicación
 const html = ReactDOM.renderToString(
  <StaticRouter location={url} context={context}>
   <App/>
  </StaticRouter>
 )
 // Se lo enviamos al servidor
 response.send(`
  <!doctype HTML>
  <html>
   <head>
    <meta charset="utf-8"/>
    <title>Example Aplicación</title>
   </head>
   <body>
    <div id="root">${ html }</div>
   </body>
  </html>
 `)
})

http.createServer( app ).listen( process.env.PORT || 3000 )
// En javascript nativo, es decir que lo siguiente que voy a explicar
// también se puede usar en el navegador,
// se utiliza || para comprobar resultados
// y funciona para casos en que queremos poner un valor por default en 
// una variable, en el caso anterior, primero toma una variable
// de entorno que se llama PORT, y si no se encuentra definida
// ( valor undefined ò false ) entonces que tome el valor 3000