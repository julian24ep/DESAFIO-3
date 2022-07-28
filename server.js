const express = require('express')
const fs = require('fs')


const Contenedor = require("./contenedor");

//console.log(http)
//req res peticion respuesta

const app = express()
app.get('/', (req, res)=>{
    res.send('Bienvenidos Al Servidor')
})


const PORT = 8080

const server = app.listen(PORT, ()=> {
  console.log("Escuchando el puerto 8080")
  
})

server.on('error', err=> console.log(err))



const contenedor = new Contenedor("./prueba.txt")

//contenedor.save({ nombre: "gorra4", color: "rosa", precio: 100, tipo: "ropa" })
//contenedor.getById(10)
//contenedor.getAll()
//contenedor.delete(6)
//contenedor.getAll()
//contenedor.deleteAll()


                            
 


 
  app.get('/productos', async (req, res) => {
    const productosTotales = await contenedor.getAll() ;
   res.end(`${[productosTotales]}`)
  })

 app.get('/productoRandom', async (req, res) => {
   const totalprod = await contenedor.numerototal();
    const random =  Math.floor((Math.random() * totalprod) + 1) ;
   const productoRandom = await contenedor.getById(random);
   res.send(productoRandom)
 })
              
app.get('/productotot',async (req, res)=>{
const totalprod = await contenedor.numerototal()
  res.send(`${totalprod}`)
  }) 