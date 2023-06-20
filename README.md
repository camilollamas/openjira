# NextJs OpenJira App
Para correr localmente, se necesita la base de datos
```
docker-compose up -d
```

** El -d, significa ___detached___

MongoDB URL Local:
```
mongodb://localhost:27017
```

#Llenar la base de datos con información de prueba:
Llamar a:
```
localhost:3000/api/seed
```