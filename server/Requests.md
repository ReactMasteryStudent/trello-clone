# Table of contents

1. [Workspace](#workspace)
2. [Board](#board)
3. [Section](#section)
4. [Card](#card)

Base URL for all requests : http://ip_address:5001/api/


## Workspace
Workspace represent a workspace with all boards inside

### Requests
`GET`(http://localhost:5001/api/workspace)
* Utility: Get the workspace
* Params: No params
* Return: Workspace with all boards
```json
{
    "id": 1,
    "name": "Default workspace",
    "boards": [
        {
            "id": 1,
            "name": "Trello clone",
            "image": "",
            "sections": [
                {
                    "id": 1,
                    "name": "Backlog",
                    "position": 1,
                    "cards": [
                        {
                            "id": 1,
                            "title": "API Call",
                            "position": 1,
                            "description": ""
                        },
                        {
                            "id": 2,
                            "title": "Header",
                            "position": 2,
                            "description": ""
                        }
                    ]
                }
            ]
        }
    ]
}
```

`PATCH`(http://localhost:5001/api/workspace)
* Utility: Update a workspace (only the name can be updated)
* Params: In the body of the request, provide the updated workspace (id is mandatory & name as well)
```json
{
    "id": 1,
    "name": "Nice Workspace"
}
```
* Return: The workspace
```json
{
    "id": 1,
    "name": "Nice workspace",
    "boards": [
        {
            "id": 1,
            "name": "Trello clone",
            "image": "",
            "sections": [
                {
                    "id": 1,
                    "name": "Backlog",
                    "position": 1,
                    "cards": [
                        {
                            "id": 1,
                            "title": "API Call",
                            "position": 1,
                            "description": ""
                        },
                        {
                            "id": 2,
                            "title": "Header",
                            "position": 2,
                            "description": ""
                        }
                    ]
                }
            ]
        }
    ]
}
````

## Board
A board will represent a board with all columns (call section) & cards

### Requests
`POST`(http://localhost:5001/api/board)
* Utility: Add a board inside the workspace
* Params: Params needed to create a board
```json
{
    "name": "Trello"
}
```
* Return: Will return the board that has been added to the workspace
```json
{
    "id": 1,
    "name": "Trello",
    "image": "",
    "sections": []
}
```

`PATCH`(http://localhost:5001/api/board)
* Utility: Update a board (only name and image can be updated)
* Params: Board (id is mandatory, name is mandatory, image is optional)
```json
{
    "id": 1,
    "name": "Trello clone",
    "image": "nice_image.jpg"
}
```
* Return: return the updated board
```json
{
    "id": 1,
    "name": "Trello clone",
    "image": "nice_image.jpg",
    "sections": [
        ...
    ]
}
```

`DELETE`(http://localhost:5001/api/board/{boardId})
* Utility: Delete a board
* Params: Give the board id as parameter in the request URL
```http
http://localhost:5001/api/board/1
```
* Return: Status code 200(Ok) if the board has been deleted or 400(BadRequest) if the board cannot be deleted


## Section
A section represent a column inside a board, a section contains all cards

### Requests
`POST`(http://localhost:5001/api/section/{boardId})
* Utility: Add a section inside a board
* Params: In request URL provide the id of the board, and as body provide the section (name is mandatory, image is optional, position is optional)

`http://localhost:5001/api/section/1`
```json
{
    "name": "Done"
}
```

* Return: return the added section
```json
{
    "id": 2,
    "name": "Done",
    "position": 1,
    "cards": []
}
```

`PATCH`(http://localhost:5001/api/section)
* Utility: Update the section (name and position can be updated)
* Params: Section information
```json
{
    "id": 2,
    "name": "To do"
}
```
* Return: Return the updated section
```json
{
    "id": 2,
    "name": "To do",
    "position": 1,
    "cards": [...]
}
```

`DELETE`(http://localhost:5001/api/section/{sectionId})
* Utility: Delete a section
* Params: In the request URL provide the section you want to delete
`http://localhost:5001/api/section/2`
* Return: Status code 200(Ok) if the section has been deleted or 400(BadRequest) if the section cannot be deleted

## Card

### Request
`POST`(http://localhost:5001/api/card/{sectionId})
* Utility: Add a card inside a section
* Params: In the request URL provide the section id where you wanna add the card, and in the body provide the card detail (title is mandatory, description is mandatory, position is optional)
`http://localhost:5001/api/card/1`
```json
{
    "title": "This is a title",
    "description": "This is a description"
}
```
* Return: The added card
```json
{
    "id": 1,
    "title": "This is a title",
    "position": 1,
    "description": "This is a description"
}
```

`PATCH`(http://localhost:5001/api/card)
* Utility: Update a card (title, description and position can be updated)
* Params: In the body provide the card detail
```json
{
    "title": "This is a title 2",
    "description": "This is a description"
}
```
* Return: The added card
```json
{
    "id": 1,
    "title": "This is a title 2",
    "position": 1,
    "description": "This is a description"
}
```

`DELETE`(http://localhost:5001/api/card/{cardId})
* Utility: Delete a card
* Params: In the request URL provide the card id
`http://localhost:5001/api/card/1`
* Return: Status code 200(Ok) if the card has been deleted or 400(BadRequest) if the card cannot be deleted


### Every time a postion is given to the api, an algorithm will verify the position given and will adapt all other position if needed