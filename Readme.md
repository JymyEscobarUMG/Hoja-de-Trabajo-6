# Hoja de Trabajo 6

# Instrucciones para ejecutar la API localmente 
1. Instalar los paquetes de Node
npm install
2. Ejecutar la API en desarrollo con nodemon
npm run start
3. Ejecutar la API en modo Produccion
npm run prod

# Una breve descripción del proyecto. 
La siguiente Api sirve como CRUD para poder crear, modificar, eliminar y consultar los usuarios que se almacenan
en un archivo JSON.

# El enlace del sitio web publicado.
https://hoja-de-trabajo-6.onrender.com/users





## POST /users: Crear un nuevo usuario
- Permite crear un usuario mediante json.
### Peticion:
{
    "dpi": "1234567890020",
    "name": "Mario",
    "email": "Mario@gmail.com",
    "password": "qwerty"
}

### Solicitud: 
Texto : "Usuario registrado exitosamente!!!."

## GET /users: Listar todos los usuarios registrados.
- Permite listar todos los usuarios creados y almacenados
### Solicitud: 
Retorna un listado
JSON : [
    {
        "dpi": "1234567890020",
        "name": "Mario",
        "email": "Mario@gmail.com",
        "password": "qwerty"
    }
]

## PUT /users/dpi: Actualizar un usuario existente.
- Actualiza un usuario que se le envia un dpi en la url y los datos en el body.
### Peticion:
{
    "name": "Mario sdf....",
    "email": "Mario@gmail.com",
    "password": "qwerty"
}

### Solicitud: 
Retorna un 
Texto : Usuario con DPI 1234567890020 actualizado exitosamente.
## DELETE /users/dpi: Eliminar un usuario.
- Elimina un usuario que se le envia un dpi en la url.
### Solicitud: 
Retorna un 
Texto : Usuario con DPI 1234567890020 eliminado exitosamente.
# El nombre del estudiante que desarrolló la página web.
Jymy Daniel Francisco Escobar Zacarías  | 9490-21-403
