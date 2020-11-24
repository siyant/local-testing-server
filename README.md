# local-testing-server

A basic nodeJS express app for testing and transferring files.

Use with [ngrok](https://ngrok.com) to call from external server.

```
ngrok http 4000
```

```
curl --location --request POST '<NGROK_URL>/upload' \
--form 'file=@/path/to/file.txt'
```
