
 const fs= require('fs')
 class Contenedor {
   constructor(ruta){
   this.ruta = ruta
     
   }

async leerarchivo(){
 let dataArch = []
 let dataArchParse
 try {
   dataArch = await fs.promises.readfile(this.ruta, 'utf8')
 }catch(error) {
   console.log('No se puede leer el archivo')
   
 }
 if (dataArch === '') dataArch = '[]'
 dataArchParse = JSON.parse(dataArch)
 return dataArchParse
}
   
   
 
 
async save(obj){
   try {
   let dataArch = await fs.promises.readFile(this.ruta, 'utf8')
   let dataArchParse = JSON.parse(dataArch)
   if (dataArchParse.length) {
       await fs.promises.writeFile(this.ruta, JSON.stringify( [...dataArchParse, { ...obj, id: dataArchParse[dataArchParse.length - 1].id + 1}], null, 2))

   } else {
   await fs.promises.writeFile(this.ruta, JSON.stringify([{ ...obj, id: 1}], null, 2))

   } 
   
   console.log(`El archivo tiene el id: ${dataArchParse[dataArchParse.length - 1].id + 1}`)
   }catch(error){

       console.log("erroragarrado")
   }
}

 
 //traer por id
 async getById(id){
   try {
       let dataArch = await fs.promises.readFile(this.ruta, 'utf8')
       let dataArchParse = JSON.parse(dataArch)
       let producto = dataArchParse.find(producto => producto.id === id)
       if (producto){
           //return producto
       console.log(producto)
   }  else  {
       //return null
       console.log('no se encontro el producto')


   }
       return producto
    } catch (error){
       console.log(error)
    }
   }
 
 
 
 //numero total de productos
async numerototal(){
 const dataArch = await fs.promises.readFile(this.ruta, 'utf-8')
 const dataArchParse = JSON.parse(dataArch)
 return dataArchParse.length
 
}
 
 
// traer todos los productos   
async getAll(){
 const dataArch = await fs.promises.readFile(this.ruta, 'utf-8')

 if(dataArch !== []){
 console.log(dataArch)
  return dataArch
 } else{

   console.log('No hay productos')
 return null;
 } 
}

//eliminar producto por id
async delete(id){
   const dataArch = await fs.promises.readFile(this.ruta, 'utf8')
   let dataArchParse = JSON.parse(dataArch)// leer y convertir al obj
   let producto = dataArchParse.find(prod => prod.id === id)
if (producto){
   const dataArchParseFiltrado = dataArchParse.filter(prod => prod.id !== id)
   await fs.promises.writeFile(this.ruta, JSON.stringify(dataArchParseFiltrado, null, 2), 'utf8')
   console.log('Producto eliminado')
}else{
console.log('No existe ese producto')
}
}
// eliminar todos los productos
async deleteAll(){
await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2), 'utf8')
}
}



module.exports = Contenedor