# TeamA-Backend - Vet

Creating Vet Apps. This app has RESTful endpoint for Vet Apps CRUD operation

# RESTful endpoints

## User

### GET https://vet-booking.herokuapp.com/user
Get User
```
Request Header : not needed
```
```
Request Body: not needed
```
```
Response: (200 - OK){
  "success": true,
  "message": "Berhasil menampilkan semua user!",
  "data": [
    {
      "image": "<user image>",
      "_id": "<user id>",
      "name": "<user name>",
      "email": "<user email>",
      "phone": "<user phone>",
      "role": "<user role>",
      "clinic/patient/veterinary": {
        <clinic/patient/veterinary attributes>
      }
      "createdAt": "<user createdAt>",
      "updatedAt": "<user updatedAt>"
    }
  ]
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

### POST https://vet-booking.herokuapp.com/user/register
Register User
```
Request Header : not needed
```
```
Request Body: {
  "name": "<user name>",
  "email": "<user email>",
  "phone": "<user phone>",
  "password": "<user password>",
  "role": "<user role>"
}
```
```
Response: (200 - OK){
  "success": true,
  "message": "Berhasil register!",
  "access_token": "<access_token>"
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

### POST https://vet-booking.herokuapp.com/user/login
Login User
```
Request Header : not needed
```
```
Request Body: {
  "email": "<user email>",
  "password": "<user password>",
}
```
```
Response: (200 - OK){
  "success": true,
  "message": "Login berhasil!",
  "access_token": "<access_token>"
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

### GET https://vet-booking.herokuapp.com/user/edit
Find User By Id
```
Request Header : {
  "access_token": "<access_token>"
}
```
```
Request Body: not needed
```
```
Response: (200 - OK){
  "success": true,
  "message": "Berhasil menampilkan user!",
  "data": 
    "user":{
      "image": "<user image>",
      "_id": "<user id>",
      "name": "<user name>",
      "email": "<user email>",
      "phone": "<user phone>",
      "role": "<user role>",
      "clinic/patient/veterinary": {
        <clinic/patient/veterinary attributes>
      }
      "createdAt": "<user createdAt>",
      "updatedAt": "<user updatedAt>"
    },
    "activedCount": "activedCount"
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

### PUT https://vet-booking.herokuapp.com/user/edit
Edit User
```
Request Header : {
  "access_token": "<access_token>"
}
```
```
Request Body: {
  "image": "<user image>",
  "nama": "<user nama>",
  "gender": "<user gender>" for patient/"genderVet": "<user gender> for veterinary",
  "phone": "<user phone>",
  patient/clinic/veterinary attributes
}
```
```
Response: (200 - OK){
  "success": true,
  "message": "Berhasil memperbarui user!",
  "data": {
      "image": "<user image>",
      "_id": "<user id>",
      "name": "<user name>",
      "email": "<user email>",
      "phone": "<user phone>",
      "role": "<user role>",
      "clinic/patient/veterinary": {
        <clinic/patient/veterinary attributes>
      }
      "createdAt": "<user createdAt>",
      "updatedAt": "<user updatedAt>"
  }
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

### DELETE https://vet-booking.herokuapp.com/user
Delete User 
```
Request Header : {
  "access_token": "<access_token>"
}
```
```
Request Body: not needed
```
```
Response: (200 - OK){
  "success": true,
  "message": "Berhasil menghapus user!",
  "data": {
      "image": "<user image>",
      "_id": "<user id>",
      "name": "<user name>",
      "email": "<user email>",
      "phone": "<user phone>",
      "role": "<user role>",
      "clinic/patient/veterinary": {
        <clinic/patient/veterinary attributes>
      }
      "createdAt": "<user createdAt>",
      "updatedAt": "<user updatedAt>"
  }
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

## Animal Type

### GET https://vet-booking.herokuapp.com/animal-type
Get Animal Types
```
Request Header : not needed
```
```
Request Body: not needed
```
```
Response: (200 - OK){
  "success": true,
  "message": "Berhasil menapilkan semua Animal Type!",
  "data": [
    {
      "_id": "<AnimalType id>",
      "type": "<AnimalType type>",
      "image": "<AnimalType image>",
      "createdAt": "<AnimalType createdAt>",
      "updatedAt": "<AnimalType updatedAt>"
    }
  ]
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

### POST https://vet-booking.herokuapp.com/animal-type
Add Animal Types
```
Request Header : not needed
```
```
Request Body: {
  "type": "<animalType type>"
}
```
```
Response: (200 - OK){
  "success": true,
  "message": "Berhasil menambah Animal Type!",
  "data": {
    "_id": "<AnimalType id>",
    "type": "<AnimalType type>",
    "createdAt": "<AnimalType createdAt>",
    "updatedAt": "<AnimalType updatedAt>"
  }
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

### DELETE https://vet-booking.herokuapp.com/animal-type
Add Animal Types
```
Request Header : not needed
```
```
Request Body: {
  "type": "<animalType type>"
}
```
```
Response: (200 - OK){
  "success": "true",
  "message": "Berhasil menghapus Animal Type!",
  "data": {
    "_id": "<AnimalType id>",
    "type": "<AnimalType type>",
    "createdAt": "<AnimalType createdAt>",
    "updatedAt": "<AnimalType updatedAt>"
  }
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

## Animal

### GET https://vet-booking.herokuapp.com/animal
Get all Animal
```
Request Header : not needed
```
```
Request Body: not needed
```
``` 
Response: (200 - OK){
  "success": true,
  "message": "Berhasil menapilkan semua animals!",
  "data": [
    {
      "_id": "<animal id>",
      "name": "<animal name>",
      "type": "<animal type>",
      "gender": "<animal gender>",
      "createdAt": "<animal createdAt>",
      "updatedAt": "<animal updatedAt>"
    }
  ]
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

### POST https://vet-booking.herokuapp.com/animal/add
Add Animal to Patient
```
Request Header : {
  "access_token": "<access_token>"
}
```
```
Request Body: {
  "name": "<animal name>",
  "type": "<animal type>",
  "gender": "<animal gender>"
}
```
``` 
Response: (200 - OK){
  "success": true,
  "message": "Berhasil menapilkan semua role!",
  "data": [
    {
      "_id": "<animal id>",
      "name": "<animal name>",
      "type": "<animal type>",
      "gender": "<animal gender>",
      "createdAt": "<animal createdAt>",
      "updatedAt": "<animal updatedAt>"
    }
  ]
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

### GET https://vet-booking.herokuapp.com/animal/user
Get Animal By Patient
```
Request Header : {
  "access_token": "<access_token>"
}
```
```
Request Body: not needed
```
``` 
Response: (200 - OK){
  "success": true,
  "message": "Berhasil menapilkan semua Animals!",
  "data": {
    name: "<user name>",
    animals:  [{
      "_id": "<animal id>",
      "name": "<animal name>",
      "type": "<animal type>",
      "gender": "<animal gender>",
      "createdAt": "<animal createdAt>",
      "updatedAt": "<animal updatedAt>"
    }],
    images: "<animal type image>"
  }
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

### DELETE https://vet-booking.herokuapp.com/animal/remove/:id
Remove an Animal in Patient
```
Request Header : {
  "access_token": "<access_token>"
}
```
```
Request Body: not needed
```
``` 
Response: (200 - OK){
  "success": true,
  "message": "Berhasil menapilkan Animals!",
  "data": [
    {
      "_id": "<animal id>",
      "name": "<animal name>",
      "type": "<animal type>",
      "gender": "<animal gender>",
      "createdAt": "<animal createdAt>",
      "updatedAt": "<animal updatedAt>"
    }
  ]
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

## Clinic

### GET https://vet-booking.herokuapp.com/clinic/?page=pageNumber
Get all Clinic
```
Request Header : not needed
```
```
Request Body: not needed
```
``` 
Response: (200 - OK){
{
    "success": true,
    "message": "Successfully retrieve the role!",
    "data": [{
        "image": "<user image>",
        "_id": "<user id>",
        "name": "<user name>",
        "email": "<user email>",
        "phone": "<user phone>",
        "role": "clinic",
        "clinic": {
            "city": "<clinic city>",
            "address": "<clinic address>",
            "schedules": [{
                    "clinic": "<user id(clinic)>",
                    "veterinary": "<user id(veterinary)>",
                    "isBooked": true/false,
                    "_id": "<schedule id>",
                    "day": <schedule date>,
                    "shift": <schedule shift>,
                    "createdAt": "<schedule createdAt>",
                    "updatedAt": "<schedule ureatedAt>"
                },
            ],
            "facilities": [],
            "chats": [],
            "reservations": [],
            "_id": "<clinic id>",
            "createdAt": "<clinic createdAt>",
            "updatedAt": "<clinic updatedAt>",
            "about": "<clinic about>"
        },
        "createdAt": "<user createdAt>",
        "updatedAt": "<user createdAt>"
    }]
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

### POST https://vet-booking.herokuapp.com/clinic/add
Menambah Schedule ke Clinic
```
Request Header : <access_token>
```
```
Request Body: {
  VetId: "<user id(veterinary)>",
  day: "<schedule day>",
  shift: "<schedule shift>",
}
```
``` 
Response: (200 - OK){
    "success": true,
    "message": "Veterinary berhasil ditambahkan ke Clinic!",
    "data": {
        "schedules": [{
            "clinic": "user id<clinic>",
            "veterinary": {
                "image": "<user image>",
                "_id": "<user id>",
                "name": "<user name>",
                "email": "<user email>",
                "phone": "<user phone>",
                "password": "<user password>",
                "role": "veterinary",
                "veterinary": "<user id(veterinary)>",
                "createdAt": "<user createdAt>",
                "updatedAt": "<user updatedAt>"
            },
            "isBooked": true/false,
            "_id": "<schedule id>",
            "day": <schedule day>,
            "shift": <schedule shift>,
            "createdAt": "<schedule createdAt>",
            "updatedAt": "<schedule ureatedAt>"
        }, ],
        "_id": "<clinic id>"
    }
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

### DELETE https://vet-booking.herokuapp.com/clinic/remove/:ScheduleId
Remove Veterinary in Clinic
```
Request Header : <access_token>
```
```
Request Body: <access_token>
```
``` 
Response: (200 - OK){
{
    "success": true,
    "message": "Berhasil menghapus Veterinary dari Clinic!",
    "data": [{
        "image": "<user image>",
        "_id": "<user id>",
        "name": "<user name>",
        "email": "<user email>",
        "phone": "<user phone>",
        "role": "clinic",
        "clinic": {
            "city": "<clinic city>",
            "address": "<clinic address>",
            "schedules": [{
                    "clinic": "<user id(clinic)>",
                    "veterinary": "<user id(veterinary)>",
                    "isBooked": true/false,
                    "_id": "<schedule id>",
                    "day": <schedule date>,
                    "shift": <schedule shift>,
                    "createdAt": "<schedule createdAt>",
                    "updatedAt": "<schedule ureatedAt>"
                },
            ],
            "facilities": [],
            "chats": [],
            "reservations": [],
            "_id": "<clinic id>",
            "createdAt": "<clinic createdAt>",
            "updatedAt": "<clinic updatedAt>",
            "about": "<clinic about>"
        },
        "createdAt": "<user createdAt>",
        "updatedAt": "<user createdAt>"
    }]
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

### POST https://vet-booking.herokuapp.com/clinic/facility
Add Facilities to Clinic
```
Request Header : <access token>
```
```
Request Body: {
  facilities: "<facility id>"
}
```
``` 
Response: (200 - OK){
    "success": true,
    "message": "Facility berhasil ditambahkan ke Clinic!",
    "data": {
        "successToAdd": [
            {
                "name": "<facility name>",
                "_id": "<facility id>"
            },
        ],
        "failedToAdd": [
            {
                "name": "<facility name>",
                "_id": "<facility id>"
            }
        ]
    }
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

### DELETE https://vet-booking.herokuapp.com/clinic/facility
Remove Facilities from Clinic
```
Request Header : <access token>
```
```
Request Body: {
  facilities: "<facility id>"
}
```
``` 
Response: (200 - OK){
    "success": true,
    "message": "Facility berhasil dihapus dari Clinic!",
    "data": {
        "successToRemove": [
            {
                "name": "<facility name>",
                "_id": "<facility id>"
            },
        ],
        "failedToRemove": [
            {
                "name": "<facility name>",
                "_id": "<facility id>"
            }
        ]
    }
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

### GET https://vet-booking.herokuapp.com/clinic/filter/?city=clinicCity
Get Clinic Filtered
```
Request Header : not needed
```
```
Request Body: {
  facilities: "<facility id>"
}
```
``` 
Response: (200 - OK){
{
    "success": true,
    "message": "Sukses filter Clinic!",
    "data": [{
        "image": "<user image>",
        "_id": "<user id>",
        "name": "<user name>",
        "email": "<user email>",
        "phone": "<user phone>",
        "role": "clinic",
        "clinic": {
            "city": "<clinic city>",
            "address": "<clinic address>",
            "facilities": [{
                "name": "<facility name>",
                "_id": "<facility id>"
            }],
            "_id": "<clinic id>",
            "about": "<clinic about>"
        }
    }]
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

### GET https://vet-booking.herokuapp.com/clinic/filter-name/?name=clinicName
Get Clinic By Name
```
Request Header : not needed
```
```
Request Body: not needed
```
``` 
Response: (200 - OK){
{
    "success": true,
    "message": "Sukses filter Clinic!",
    "data": [{
        "image": "<user image>",
        "_id": "<user id>",
        "name": "<user name>",
        "email": "<user email>",
        "phone": "<user phone>",
        "role": "clinic",
        "clinic": {
            "city": "<clinic city>",
            "address": "<clinic address>",
            "facilities": [{
                "name": "<facility name>",
                "_id": "<facility id>"
            }],
            "_id": "<clinic id>",
            "about": "<clinic about>"
        }
    }]
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

### GET https://vet-booking.herokuapp.com/clinic/veterinary/
Show Veterinary list by Clinic
```
Request Header : "access_token"
```
```
Request Body: not needed
```
``` 
Response: (200 - OK){
    "success": true,
    "message": "Success showing Veterinaries by Clinic!",
    "data": {
        "name": "<user name(clinic)>",
        "veterinaries": [{
            "_id": "<user id(veterinary)>",
            "name": "<user name(veterinary)>",
            "image": "<user image(veterinary)>"
        }]
    }
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

### POST https://vet-booking.herokuapp.com/clinic/veterinary/:VetId
Add Veterinary to Clinic
```
Request Header : "access_token"
```
```
Request Body: not needed
```
``` 
Response: (200 - OK){
    "success": true,
    "message": "Success adding Veterinary to Clinic!",
    "data": {
        "name": "<user name>",
        "veterinaries": [{
            "_id": "<user id(veterinary)>",
            "name": "<user name>"
        }, ]
    }
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

### DELETE https://vet-booking.herokuapp.com/clinic/veterinary/:VetId
Delete Veterinary from Clinic
```
Request Header : "access_token"
```
```
Request Body: not needed
```
``` 
Response: (200 - OK){
    "success": true,
    "message": "Success adding Veterinary to Clinic!",
    "data": {
        "name": "<user name>",
        "veterinaries": [{
            "_id": "<user id(veterinary)>",
            "name": "<user name>"
        }, ]
    }
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

### PUT https://vet-booking.herokuapp.com/clinic/online/:id
Clinic Online
```
Request Header : "<access_token>"
```
```
Request Body: not needed
```
``` 
Response: (200 - OK){
{
    "success": true,
    "message": "Clinic Online",
    "data": {
        "status": "<clinic status>",
        "city": "<clinic city>",
        "address": "<clinic address>",
        "veterinaries": [
            "<veterinary id>"
        ],
        "schedules": [
            "<schedule id>"
        ],
        "facilities": [
            "<facility id>"
        ],
        "chats": [],
        "reservations": [
            "<reservation id>"
        ],
        "_id": "<clinic id>",
        "createdAt": "<clinic createdAt>",
        "updatedAt": "<clinic updatedAt>",
        "about": "<clinic about>"
    }
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

### GET https://vet-booking.herokuapp.com/clinic/getAll
Get all Clinic without paginate
```
Request Header : not needed
```
```
Request Body: not needed
```
``` 
Response: (200 - OK){
    "success": true,
    "message": "Success showing All Clinic without pagination",
    "data": [{
        "image": "<user image>",
        "_id": "<user id>",
        "name": "<user name>",
        "email": "<user email>",
        "phone": "<user phone>",
        "role": "<user role>",
        "clinic": {
            "status": "<clinic status>",
            "city": "<clinic city>",
            "address": "<clinic address>",
            "veterinaries": [
                "<clinic veterinaries>"
            ],
            "schedules": [{ "<clinic schedules>" }],
            "facilities": [{ "<clinic facilities>" }],
            "_id": "<clinic id>",
            "about": "<clinic about>"
        }
    }, ]
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

## Schedule

### GET https://vet-booking.herokuapp.com/schedule
Get all Schedule
```
Request Header : not needed
```
```
Request Body: not needed
```
``` 
Response: (200 - OK){
    "success": true,
    "message": "Berhasil menampilkan semua Schedule!",
    "data": [{
        "clinic": "<user id(clinic)>",
        "veterinary": "<user id(veterinary)>",
        "isBooked": true/false,
        "_id": "<schedule id>",
        "day": "<schedule day>",
        "shift": "<schedule shift>",
        "createdAt": "<schedule createdAt>",
        "updatedAt": "<schedule updatedAt>"
    }]
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

### GET https://vet-booking.herokuapp.com/schedule/:ClinicId
Get Schedule by Time
```
Request Header : not needed
```
```
Request Body: {
  day: "<schedule day>",
  shift: "<schedule shift>"
}
```
``` 
Response: (200 - OK){
    "success": true,
    "message": "Berhasil menampilkan semua Schedule!",
    "data": [{
        "clinic": "<user id(clinic)>",
        "veterinary": "<user id(veterinary)>",
        "isBooked": true/false,
        "_id": "<schedule id>",
        "day": "<schedule day>",
        "shift": "<schedule shift>",
        "createdAt": "<schedule createdAt>",
        "updatedAt": "<schedule updatedAt>"
    }]
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

## Facility

### GET https://vet-booking.herokuapp.com/facility
Get Facility
```
Request Header : not needed
```
```
Request Body: not needed
```
``` 
Response: (200 - OK){
    "success": true,
    "message": "Success retrieve facilities!",
    "data": [{
            "name": "<facility name>",
            "_id": "<facility id>"
        },
    ]
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

### POST https://vet-booking.herokuapp.com/facility
Create Facility
```
Request Header : not needed
```
```
Request Body: not needed
```
``` 
Response: (200 - OK){
    "success": true,
    "message": "Success create Facility!",
    "data": {
        "name": "<facility name>",
        "_id": "<facility id>"
        "createdAt": "<facility createdAt>"
        "upatedAt": "<facility upatedAt>"
    }
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

### DELETE https://vet-booking.herokuapp.com/facility/:id
Delete Facility
```
Request Header : not needed
```
```
Request Body: not needed
```
``` 
Response: (200 - OK){
    "success": true,
    "message": "Success delete the Facility!",
    "data": {
        "name": "<facility name>",
        "_id": "<facility id>"
        "createdAt": "<facility createdAt>"
        "upatedAt": "<facility upatedAt>"
    }
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

## Reservation

### GET https://vet-booking.herokuapp.com/reservation
Get all Resevations
```
Request Header : "<access_token>"
```
```
Request Body: not needed
```
``` 
Response: (200 - OK){
    "success": true,
    "message": "Success delete the Facility!",
    "data": {
        "name": "<facility name>",
        "_id": "<facility id>"
        "createdAt": "<facility createdAt>"
        "upatedAt": "<facility upatedAt>"
    }
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

### GET https://vet-booking.herokuapp.com/reservation/form/:id
Get Form Reservation by Clinic User Id
```
Request Header : not needed
```
```
Request Body: not needed
```
``` 
Response: (200 - OK){
    "success": true,
    "message": "Successfully get form booking!",
    "data": {
        "dateBooking": ["<tanggal booking>"],
        "hour": [
            "09.00-12.00",
            "12.30-15.30",
            "16.00-19.00"
        ],
        "clinic": {
            "image": "<user image>",
            "_id": "<user id(clinic)>",
            "name": "<user name(clinic)>",
            "clinic": {
                "facilities": [{
                    "name": "<facility name>",
                    "_id": "<facility id>"
                }, ],
                "_id": "<clinic id>",
                "about": "<clinic about>"
            }
        }
    }
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

### POST https://vet-booking.herokuapp.com/reservation/choose/:id
Show Vets Schedule Reservation by Clinic User Id
```
Request Header : "<access_token>"
```
```
Request Body: {
  "hourReservation": "<hourReservation>"
  "dateReservation": "<dateReservation>"
}
```
``` 
Response: (200 - OK){
    "success": true,
    "message": "Successfully show list veterinaries!",
    "data": {
        "schedules": [{
            "veterinary": {
                "image": "<user image(veterinary)>",
                "_id": "<user id(veterinary)>",
                "name": "<user name(veterinary)>"
            },
            "_id": "<schedule id>"
        }, ],
        "reservationDate": "<Reservation Date>"
    }
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

### POST https://vet-booking.herokuapp.com/reservation/create/:ScheduleId
Create Reservation by Schedule Id
```
Request Header : "<access_token>"
```
```
Request Body: {
  "animalId": ["<animal id>"]
  "dateReservation": "<dateReservation>"
}
```
``` 
Response: (200 - OK){
    "success": true,
    "message": "Successfully create Reservation!",
    "data": {
        "status": "pending",
        "patient": {
            "_id": "<user id(patient)>",
            "name": "<user name(patient)>"
        },
        "schedule": {
            "clinic": {
                "_id": "<user id(clinic)>",
                "name": "<user name(clinic)>"
            },
            "veterinary": {
                "_id": "<user id(veterinary)>",
                "name": "<user name(veterinary)>"
            },
            "_id": "<schedule id>"
        },
        "animals": [{
                "_id": "<animal id>",
                "name": "<animal name>",
                "type": "<animal type>",
                "gender": <animal gender>
            },
        ]
        "_id": "<reservation id>",
        "date": "<reservation date>"
    }
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

### GET https://vet-booking.herokuapp.com/reservation/find-patient
Get all reservation By Patient
```
Request Header : "<access_token>"
```
```
Request Body: not needed
```
``` 
Response: (200 - OK){
    "success": true,
    "message": "Success show reservation by Patient!",
    "data": {
        "reservations": [{
            "status": "<reservation status>",
            "schedule": {
                "clinic": {
                    "image": "<user image(clinic)>",
                    "_id": "<user id(clinic)>",
                    "name": "<user name(clinic)>"
                },
                "veterinary": {
                    "image": "<user image(veterinary)>",
                    "_id": "<user id(veterinary)>",
                    "name": "<user name(veterinary)>"
                },
                "_id": "<schedule id>"
            },
            "animals": [{
                    "_id": "<animals id>",
                    "name": "<animals name>",
                    "type": "<animals type>",
                    "gender": <animals gender>
                }
            ],
            "_id": "<reservation id>",
            "date": "<reservation date>"
        }],
        "tanggal": [
            "<tanggal reservation(local date)>"
        ]
    }
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

### GET https://vet-booking.herokuapp.com/reservation/find-clinic
Get all reservation By Clinic
```
Request Header : "<access_token>"
```
```
Request Body: not needed
```
``` 
Response: (200 - OK){
    "success": true,
    "message": "Success show reservation by Patient!",
    "data": {
        "reservations": [{
            "status": "<reservation status>",
            "patient": {
              "_id": "<user id(veterinary)>",
              "name": "<user name(veterinary)>"
            },
            "schedule": {
                "veterinary": {
                  "image": "<user image(veterinary)>",
                  "_id": "<user id(veterinary)>",
                  "name": "<user name(veterinary)>"
                },
                "_id": "<schedule id>"
            },
            "animals": [{
                  "_id": "<animals id>",
                  "name": "<animals name>",
                  "type": "<animals type>",
                  "gender": <animals gender>
                }
            ],
            "_id": "<reservation id>",
            "date": "<reservation date>"
        }],
        "tanggal": [
            "<tanggal reservation(local date)>"
        ]
    }
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

### GET https://vet-booking.herokuapp.com/reservation/history-patient
Get all history reservation By Patient
```
Request Header : "<access_token>"
```
```
Request Body: not needed
```
``` 
Response: (200 - OK){
    "success": true,
    "message": "Success show history Reservation by Patient!",
    "data": {
        "reservations": [{
            "status": "<reservation status>",
            "schedule": {
                "clinic": {
                    "image": "<user image(clinic)>",
                    "_id": "<user id(clinic)>",
                    "name": "<user name(clinic)>"
                    "clinic": {
                      "city": "<clinic city>"
                      "id": "<clinic id>"
                    }
                },
                "veterinary": {
                    "image": "<user image(veterinary)>",
                    "_id": "<user id(veterinary)>",
                    "name": "<user name(veterinary)>"
                },
                "_id": "<schedule id>"
            },
            "animals": [{
                    "_id": "<animals id>",
                    "name": "<animals name>",
                    "type": "<animals type>",
                    "gender": <animals gender>
                }
            ],
            "_id": "<reservation id>",
            "date": "<reservation date>"
        }],
        "times": [{
            "<time tanggal(local date)>"
            "<time jam(local hour)>"
          },
        ]
    }
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

### GET https://vet-booking.herokuapp.com/reservation/history-clinic
Get all reservation By Clinic
```
Request Header : "<access_token>"
```
```
Request Body: not needed
```
``` 
Response: (200 - OK){
    "success": true,
    "message": "Success show history Clinic!",
    "data": {
        "reservations": [{
            "status": "<reservation status>",
            "patient": {
              "_id": "<user id(veterinary)>",
              "name": "<user name(veterinary)>"
            },
            "schedule": {
                "veterinary": {
                  "image": "<user image(veterinary)>",
                  "_id": "<user id(veterinary)>",
                  "name": "<user name(veterinary)>"
                },
                "_id": "<schedule id>"
            },
            "animals": [{
                  "_id": "<animals id>",
                  "name": "<animals name>",
                  "type": "<animals type>",
                  "gender": <animals gender>
                }
            ],
            "_id": "<reservation id>",
            "date": "<reservation date>"
        }],
        "times": [{
            "<time tanggal(local date)>"
            "<time jam(local hour)>"
          },
    }
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

### GET https://vet-booking.herokuapp.com/reservation/history-vet
Get all reservation By Veterinary
```
Request Header : "<access_token>"
```
```
Request Body: not needed
```
``` 
Response: (200 - OK){
    "success": true,
    "message": "Success show Veterinary History",
    "data": {
        "reservations": [{
            "status": "<reservation status>",
            "patient": {
              "_id": "<user id(veterinary)>",
              "name": "<user name(veterinary)>"
            },
            "schedule": {
                "veterinary": {
                  "image": "<user image(veterinary)>",
                  "_id": "<user id(veterinary)>",
                  "name": "<user name(veterinary)>"
                },
                "_id": "<schedule id>"
            },
            "animals": [{
                  "_id": "<animals id>",
                  "name": "<animals name>",
                  "type": "<animals type>",
                  "gender": <animals gender>
                }
            ],
            "_id": "<reservation id>",
            "date": "<reservation date>"
        }],
        "times": [{
            "<time tanggal(local date)>"
            "<time jam(local hour)>"
          },
    }
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

### GET https://vet-booking.herokuapp.com/reservation/appointment-patient
Get all appointment reservation By Patient
```
Request Header : "<access_token>"
```
```
Request Body: not needed
```
``` 
Response: (200 - OK){
    "success": true,
    "message": "Success show appointment Reservation by Patient!",
    "data": {
        "reservations": [{
            "status": "<reservation status>",
            "schedule": {
                "clinic": {
                    "image": "<user image(clinic)>",
                    "_id": "<user id(clinic)>",
                    "clinic": {
                      "city": "<clinic city>"
                      "id": "<clinic id>"
                    }
                },
                "veterinary": {
                    "image": "<user image(veterinary)>",
                    "_id": "<user id(veterinary)>",
                    "name": "<user name(veterinary)>"
                },
                "_id": "<schedule id>"
            },
            "animals": [{
                    "_id": "<animals id>",
                    "name": "<animals name>",
                    "type": "<animals type>",
                    "gender": <animals gender>
                }
            ],
            "_id": "<reservation id>",
            "date": "<reservation date>"
        }],
        "times": [{
            "<time tanggal(local date)>"
            "<time jam(local hour)>"
          },
    }
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

### GET https://vet-booking.herokuapp.com/reservation/appointment-vet
Get all appointment reservation By Veterinary
```
Request Header : "<access_token>"
```
```
Request Body: not needed
```
``` 
Response: (200 - OK)
{
    "success": true,
    "message": "Success show Veterinary Appointment!",
    "data": {
        "reservations": [
            {
                "status": "<reservation status>",
                "patient": {
                    "_id": "<user id (patient)>",
                    "name": "<patient name>"
                },
                "schedule": {
                    "clinic": {
                        "image": "<clinic image>",
                        "name": "<clinic name>"
                    },
                    "_id": "<clinic id>"
                },
                "animals": [
                    {
                        "_id": "<animal id>",
                        "name": "<animal name>",
                        "type": "<animal type>",
                        "gender": <animal gender>
                    },
                    {
                        "_id": "<animal id>",
                        "name": "<animal name>",
                        "type": "<animal type>",
                        "gender": <animal gender>
                    }
                ],
                "_id": "<reservation id>",
                "date": "<reservation date>"
            }
        ],
        "times": [
            {
                "tanggal": "<reservation time>",
                "jam": "<>reservation hour"
            }
        ]
    }
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

### GET https://vet-booking.herokuapp.com/reservation/appointment-clinic
Get all appointment By Clinic
```
Request Header : "<access_token>"
```
```
Request Body: not needed
```
``` 
Response: (200 - OK){
    "success": true,
    "message": "Success show appointment by clinic!",
    "data": {
        "reservations": [{
            "status": "<reservation status>",
            "patient": {
              "_id": "<user id(veterinary)>",
              "name": "<user name(veterinary)>"
            },
            "schedule": {
                "veterinary": {
                  "image": "<user image(veterinary)>",
                  "_id": "<user id(veterinary)>",
                  "name": "<user name(veterinary)>"
                },
                "_id": "<schedule id>"
            },
            "animals": [{
                  "_id": "<animals id>",
                  "name": "<animals name>",
                  "type": "<animals type>",
                  "gender": <animals gender>
                }
            ],
            "_id": "<reservation id>",
            "date": "<reservation date>"
        }],
        "times": [{
            "<time tanggal(local date)>"
            "<time jam(local hour)>"
          },
    }
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

### PUT https://vet-booking.herokuapp.com/reservation/approved/:ReservationId
Approve appointment
```
Request Header : "<access_token>"
```
```
Request Body: not needed
```
``` 
Response: (200 - OK){
    "success": true,
    "message": "Reservation Approved!",
    "data": {
        "reservations": [{
            "status": "approved,
            "patient": {
              "_id": "<user id(veterinary)>",
              "name": "<user name(veterinary)>"
            },
            "schedule": {
                "veterinary": {
                  "_id": "<user id(veterinary)>",
                  "name": "<user name(veterinary)>"
                },
                "_id": "<schedule id>"
            },
            "animals": [{
                  "_id": "<animals id>",
                  "name": "<animals name>",
                  "type": "<animals type>",
                  "gender": <animals gender>
                }
            ],
            "_id": "<reservation id>",
            "date": "<reservation date>"
        }],
        "time": {
            "<time tanggal(local date)>"
            "<time jam(local hour)>"
          }
    }
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

### PUT https://vet-booking.herokuapp.com/reservation/rejected/:ReservationId
Reject appointment
```
Request Header : "<access_token>"
```
```
Request Body: not needed
```
``` 
Response: (200 - OK){
    "success": true,
    "message": "Reservation Rejected!",
    "data": {
        "reservations": [{
            "status": "rejected",
            "patient": {
              "_id": "<user id(veterinary)>",
              "name": "<user name(veterinary)>"
            },
            "schedule": {
                "veterinary": {
                  "_id": "<user id(veterinary)>",
                  "name": "<user name(veterinary)>"
                },
                "_id": "<schedule id>"
            },
            "animals": [{
                  "_id": "<animals id>",
                  "name": "<animals name>",
                  "type": "<animals type>",
                  "gender": <animals gender>
                }
            ],
            "_id": "<reservation id>",
            "date": "<reservation date>"
        }],
        "time": {
            "<time tanggal(local date)>"
            "<time jam(local hour)>"
          }
    }
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

## Veterinary

### GET https://vet-booking.herokuapp.com/veterinary
Get Veterinary
```
Request Header : not needed
```
```
Request Body: not needed
```
``` 
Response: (200 - OK){
{
    "success": true,
    "message": "Success retrive veterinary list",
    "data": [{
        "image": "<user image>",
        "_id": "<user id>",
        "name": "<user name>",
        "email": "<user email>",
        "phone": "<user phone>",
        "role": "veterinary",
        "veterinary": {
            "gender": "<veterinary gender>",
            "schedules": [{
                "clinic": "<user id(clinic)>",
                "veterinary": "<user id(veterinary)>",
                "isBooked": "<schedule isBooked>",
                "_id": "<schedule id>",
                "day": "<schedule day>",
                "shift": "<schedule day>"
            }, ],
            "experience": "<veterinary experience>",
            "_id": "<veterinary id>"
        }
    }]
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

### PUT https://vet-booking.herokuapp.com/veterinary/online/:id
Veterinary Online
```
Request Header : "<access_token>"
```
```
Request Body: not needed
```
``` 
Response: (200 - OK){
{
    "success": true,
    "message": "Veterinary Online",
    "data": {
        "gender": "<veterinary gender>",
        "schedules": [
            <schedule Id>
        ],
        "experience": "<veterinary experience>",
        "status": "<veterinary status>",
        "_id": "<veterinary Id>",
        "createdAt": "<veterinary createdAt>",
        "updatedAt": "<veterinary updatedAt>"
    }
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

### CHATS

### GET https://vet-booking.herokuapp.com/chat/
Get All Chat ClinicId
```
Request Header : "<access_token>"
```
```
Request Body: not needed
```
``` 
Response: (200 - OK){
    "success": true,
    "message": "Success show all chat user",
    "data": {
          "user": [
                <user patient>,
                <user clinic>
          ],
          "message": [
              {
                  "sender": <user id>,
                  "message": <message>
              },
              {
                  "sender": <user id>,
                  "message": <message>
              }
          ],
          "_id": <chat id>,
          "createdAt": "<veterinary createdAt>",
          "updatedAt": "<veterinary updatedAt>"
        }
    }
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```
### POST https://vet-booking.herokuapp.com/chat/initiate/:user2
Create chat room by patient
```
Request Header : "<access_token>"
```
```
Request Body: not needed
```
``` 
Response: available Room (200 - OK){
  {
    "isNew": false,
    "msg": "Retrieving an old chatroom",
    "data": [
        {
            "user": [
                {
                    "image": <image user>,
                    "_id": <user id>,
                    "name": <user name>
                },
                {
                   "image": <image user>,
                    "_id": <user id>,
                    "name": <user name>
                }
            ],
            "message": [],
            "_id": <chat id>,
            "createdAt": "<veterinary createdAt>",
            "updatedAt": "<veterinary updatedAt>"
        }
    ]
}
```
```
Response: available Room (200 - OK){
    "isNew": true,
    "msg": <user id patient> create chatroom with <user id clinic(user 2)>
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```
### POST https://vet-booking.herokuapp.com/chat/message/:roomId
Send message to the receiver
```
Request Header : "<access_token>"
```
```
Request Body: {
  "message": "<message>"
}
```
``` 
Response: (200 - OK){
   "success": true,
    "data": "5fb1537535e66e0017ef4c3e",
    "room": {
        "user": [
            {
                "image": <image user patient>,
                "_id": <userId>,
                "name": <user name>
            },
            {
                "image": <image user clinic>,
                "_id": <userId>,
                "name": <user name>
            }
        ],
        "message": [
            {
                "sender": <user id>,
                "message": <message>
            },
            {
                "sender": <user id>,
                "message": <message>
            }
        ],
        "_id": <chat id>,
        "createdAt": "<veterinary createdAt>",
        "updatedAt": "<veterinary updatedAt>"
    }
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```

### GET https://vet-booking.herokuapp.com/chat/:roomId
Retrive chat by roomId
```
Request Header : "<access_token>"
```
```
Request Body: not needed
```
``` 
Response: (200 - OK){
    "success": true,
    "message": "Success show all chat user",
    "data": [
        {
          "user": [
              {
                  "image": <image user patient>,
                  "_id": <userId>,
                  "name": <user name>
              },
              {
                  "image": <image user clinic>,
                  "_id": <userId>,
                  "name": <user name>
              }
          ],
          "message": [
              {
                  "sender": <user id>,
                  "message": <message>
              },
              {
                  "sender": <user id>,
                  "message": <message>
              }
          ],
          "_id": <chat id>,
          "createdAt": "<veterinary createdAt>",
          "updatedAt": "<veterinary updatedAt>"
        }
    }
}
```
```
Response: (400 - Bad Request){
  "success": false,
  "message": "<error message>",
}
```