import GistS3 from '.';

const gistS3 = new GistS3({
  personalAccessToken: process.env.GH_TOKEN!,
  gistId: process.env.GH_GIST_ID!,
});

const main = async () => {
  await gistS3.put('hello.txt', 'world8');
  const content = await gistS3.get('hello.txt');
  console.log(content);
};

main();
