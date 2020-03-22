# police-api
Node.js REST API for interaction with Mysql Database 

## Routes (Available End-points)
| METHOD        | URL           | Description |
| ------------- | ------------- | ----------- |
| /GET          | /weapons      | get all the weapons that has already been used in a crime              |
| /GET          | /crimes/{id}  | get the crime specified, with all the aggregated info|
| /POST         | /crimes       | add a new crime                                  |
| /DELETE       | /crimes/{id}  | remove the specified crime                       |



