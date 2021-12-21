import GitHubDatabase from '.';

const githubDatabase = new GitHubDatabase({
  token: process.env.GH_TOKEN!,
  owner: process.env.GH_OWNER!,
  repo: process.env.GH_REPO!,
  releaseTag: process.env.GH_RELEASE_TAG!,
});

const main = async () => {
  await githubDatabase.init();
};

main();

// import {Octokit} from '@octokit/core';
// import {restEndpointMethods} from '@octokit/plugin-rest-endpoint-methods';

// const MyOctokit = Octokit.plugin(restEndpointMethods);
// const octokit = new MyOctokit({auth: process.env.GH_TOKEN});

// const owner = process.env.GH_OWNER!;
// const repo = process.env.GH_REPO!;
// const release_id = parseInt(process.env.GH_RELEASE_ID!);

// const main = async () => {
//   // get release
//   const r = await octokit.rest.repos.getRelease({
//     owner,
//     repo,
//     release_id,
//   });

//   // delete old assets
//   const oldAssets = r.data.assets.filter(
//     asset =>
//       Date.now() - new Date(asset.updated_at).getTime() > 24 * 60 * 60 * 1000
//   );
//   console.log(JSON.stringify(oldAssets, null, 2));
//   for (const oldAsset of oldAssets) {
//     await octokit.rest.repos.deleteReleaseAsset({
//       owner,
//       repo,
//       asset_id: oldAsset.id,
//     });
//   }

//   // upload new asset
//   const r2 = await octokit.rest.repos.uploadReleaseAsset({
//     owner,
//     repo,
//     release_id,
//     name: 'hello2.txt',
//     data: 'world',
//   });
//   console.log(JSON.stringify(r2, null, 2));
// };

// main();
