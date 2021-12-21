# Gist S3

Use Gist as a Simple Storage Service.


## Install

```
yarn add gist-s3
```


## Usage

```ts
import GistS3 from 'gist-s3';

const gistS3 = new GistS3({
  personalAccessToken: process.env.GH_TOKEN!,
  gistId: process.env.GH_GIST_ID!,
});

const main = async () => {
  await gistS3.put('hello.txt', 'world');
  const content = await gistS3.get('hello.txt');
};

main();
```
