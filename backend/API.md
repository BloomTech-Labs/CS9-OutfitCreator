## POST to /item
This request should have the following format:
```
{
	"name": "black flats",
	"image": "www.thisisarealurl.com/shoes",
	"type": "shoes",
	"tags": ["black", "formal"]
}
```

## POST to /outfit
This request should have the following format:
```
{
	"name": "christmas party outfit",
	"tags": ["formal", "work"],
	"worn": [],
	"top": ["5b71ec57a606882af8789934", "5b71ec57a606882af8789937"],
	"bottom": ["5b71ec8ba606882af8789935"],
	"shoes": "5b71ecafa606882af8789936"
}
```

## GET from /item/:id
A GET request for a specific item by ID. Returns an object like this:
```
{
    "tags": [
        "red",
        "christmas"
    ],
    "_id": "5b730ebe353aa20014aac581",
    "name": "red sweater",
    "image": "www.thisisarealurl.com/sweater",
    "type": "top",
    "__v": 0
}
```

## GET from /outfit/:id
A GET request for a specific outfit by ID. Returns an object like this:
```
{
    "tags": [
        "formal",
        "work"
    ],
    "worn": [],
    "top": [
        "5b730e92353aa20014aac580",
        "5b730ebe353aa20014aac581"
    ],
    "bottom": [
        "5b730e67353aa20014aac57f"
    ],
    "_id": "5b730edf353aa20014aac582",
    "name": "christmas party outfit",
    "shoes": "5b730e26353aa20014aac57e",
    "__v": 0
}
```