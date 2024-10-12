
# **Hoja de Trabajo 8**

## **Instrucciones para ejecutar la API localmente**

1. **Instalar los paquetes de Node**  
   ```bash
   npm install
   ```
2. **Ejecutar la API en desarrollo con nodemon**  
   ```bash
   npm run start
   ```
3. **Ejecutar la API en modo Producción**  
   ```bash
   npm run prod
   ```

---

## **Descripción breve del proyecto**

La siguiente API sirve como un CRUD para crear, modificar, eliminar y consultar los usuarios almacenados en un archivo JSON. Además, se ha implementado **validación mediante JSON Web Token (JWT)** para las operaciones que requieren autenticación.

---

## **Enlace del sitio web publicado**

https://hoja-de-trabajo-8.onrender.com

---

## **Rutas de la API**

### **POST /users/login: Iniciar sesión**

- **Descripción:** Permite que un usuario inicie sesión utilizando su email y contraseña. Si las credenciales son correctas, se devuelve un token JWT.

#### **Ejemplo de solicitud:**
```json
{
  "email": "Mario@gmail.com",
  "password": "qwerty"
}
```
- **Respuesta exitosa:**
```json
{
  "message": "Login exitoso",
  "token": "<JWT_TOKEN>"
}
```
- **Respuesta con error:**
```json
{
  "message": "Credenciales inválidas"
}
```

---

### **POST /users: Crear un nuevo usuario**

- **Descripción:** Permite crear un usuario mediante un JSON.

#### **Ejemplo de solicitud:**
```json
{
  "dpi": "1234567890020",
  "name": "Mario",
  "email": "Mario@gmail.com",
  "password": "qwerty"
}
```
- **Respuesta:**  
  Texto: _"Usuario registrado exitosamente!!!."_

---

### **GET /users: Listar todos los usuarios registrados**

- **Descripción:** Permite listar todos los usuarios creados y almacenados.

#### **Ejemplo de respuesta:**
```json
[
  {
    "dpi": "1234567890020",
    "name": "Mario",
    "email": "Mario@gmail.com",
    "password": "qwerty"
  }
]
```

---

### **PUT /users/dpi: Actualizar un usuario existente**

- **Descripción:** Actualiza un usuario mediante el `dpi` en la URL y los datos en el cuerpo de la solicitud.

#### **Ejemplo de solicitud:**
```json
{
  "name": "Mario actualizado",
  "email": "Mario@gmail.com",
  "password": "qwerty"
}
```
- **Respuesta:**  
  Texto: _"Usuario con DPI 1234567890020 actualizado exitosamente."_

---

### **DELETE /users/dpi: Eliminar un usuario**

- **Descripción:** Elimina un usuario mediante el `dpi` en la URL.

- **Respuesta:**  
  Texto: _"Usuario con DPI 1234567890020 eliminado exitosamente."_

---

## **Desarrollador**

**Jymy Daniel Francisco Escobar Zacarías**  
Carné: _9490-21-403_
