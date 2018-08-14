## POST to /item

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
A GET request for a specific item by ID

## GET from /outfit/:id
A GET request for a specific outfit by ID