
# rmce_api.ts

```ts
  protected transformOptions = async (options: RequestInit): Promise<RequestInit> => {

    options.headers = {
      ...options.headers,
      mode: 'no-cors', // It can be no-cors, cors, same-origin
      credentials: 'same-origin' // It can be include, same-origin, omit
    };
    return Promise.resolve(options);
  };

```
