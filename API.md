### Chat completions
> https://platform.openai.com/docs/guides/chat
- URL /ai/chat
- Method POST
```ts
//RequestBody
{
  requestType: string,  // your business type eg: wx siri
  prompt: string,       // chat message
  funcType: string,     // competition or chatCompetition
}
//Response
{
  code: number,
  message: string,
  data: string,         // chat response
}
```
### Image generation 
> https://platform.openai.com/docs/guides/images
- URL /ai/image
- Method POST
```ts
//RequestBody
{
  requestType: string,  // your business type eg: wx siri
  prompt: string,       // image prompt
}
//Response
{
  code: number,
  message: string,
  data: string,         // image url
}
```

### Track the conversation
> https://github.com/transitive-bullshit/chatgpt-api
- URL /ai/conversation
- Method POST
```ts
//RequestBody
{
  requestType: string,  // your business type eg: wx siri
  prompt: string,       // chat message
  userId: string,       // need unique
}
//Response
{
  code: number,
  message: string,
  data: string,          // chat response
}
```