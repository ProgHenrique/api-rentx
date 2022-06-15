**RF** => Requisitos funcionais
**RNF** => Requisitos não funcionais
**RN** => Regra de negócio

# Car's register

**RF**
Should be able to register a new car.
Should be able to list all categories.

**RN**
Should not be able to register a new car when have other car with the same plate.
Should not be able change the car's plate already register.
The car need be registered as available.
Only admin users can register a new car.

# Car's list

**RF**
Should be able list all cars available.
Should be able list all cars available by category's name.
Should be able list all cars available by brand's name.
Should be able list all cars available by car's name.

**RN**
The users don't need to login to see the list of cars available.

# Car's specification register

**RF**
Should be able to register a specification for a car.
Should be able to list all specifications.
Should be able to list all cars.

**RN**
Should not be able register a specification for a car not registered.
Should not be able register a specification already existing for a same car.
Only admin users can register a specification for a car.

# Car's images register

**RF**
Should be able to register a image for a car.
Should be able to list all cars.

**RNF** 
Use multer for file's upload.

**RN**
Should be able to register more then one image for a car.
Only admin users can register a image for a car.

# Rental of cars

**RF**
Should be able to register the rental of car.

**RN**
Rental requirements must last at least 24 hours.
Should not be able to register a new rental when it already exists for a same user.
Should not be able to register a new rental when it already exists for a same car.
