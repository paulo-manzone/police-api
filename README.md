# police-api
Node.js REST API for interaction with Mysql Database 

## Routes (Available End-points)
| METHOD        | URL           | Description |
| ------------- | ------------- | ----------- |
| /GET          | /weapons      | get all the weapons that has already been used in a crime              |
| /GET          | /crimes/{id}  | get the crime specified, with all the aggregated info|
| /POST         | /crimes       | add a new crime                                  |
| /DELETE       | /crimes/{id}  | remove the specified crime                       |

## Post body example

{
    "country": "Guatemole",
    "dt_crime": "2019-02-22",
    "victims": [
        {
            "id_victim": 1
        },
        {
            "id_victim": 2
        },
        {
            "id_victim": 6
        }
    ],
    "weapons": [
        {
        	"id_weapon": 1
        }
    ],
    "criminals": [
        {
            "id_criminal":   1,
            "id_crime_type": 1
        }
    ]
}




