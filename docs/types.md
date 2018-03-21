## Type Reference

**Config**
```
{
	debugMode: boolean | false,
	port: number | 8000,
	contentTypes: ContentTypes | /app/public/contenttypes.json,
	timeout: number | 30000,
	handleOptions: boolean | true
}
```

**ContentTypes**
```
{
	[index: string]: string
}
```

**Handlers**
```
all | get | post | put | delete
```

**PathHandler**

```
(request, response):  RouteHandler
```

**ResponseHeaders**

```
{
	[index: string]: string
}
```