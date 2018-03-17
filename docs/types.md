## Type Reference

**Config**
```
{
	debugMode: boolean | false,
	port: number | 8000,
	contentTypes: ContentTypes | /app/public/contenttypes.json,
	timeout: number | 30000
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
all | get | post | put | delete | options
```

**PathHandler**

```
(request, response):  RouteHandler
```