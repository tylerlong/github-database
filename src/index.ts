import {Octokit} from '@octokit/core';
import {restEndpointMethods} from '@octokit/plugin-rest-endpoint-methods';

const MyOctokit = Octokit.plugin(restEndpointMethods);
const octokit = new MyOctokit({auth: process.env.GH_TOKEN});

const owner = 'tylerlong';
const repo = 'github-database';
const release_id = 55697422;

const main = async () => {
  // get release
  const r = await octokit.rest.repos.getRelease({
    owner,
    repo,
    release_id,
  });

  // delete old assets
  const oldAssets = r.data.assets.filter(
    asset =>
      Date.now() - new Date(asset.updated_at).getTime() > 24 * 60 * 60 * 1000
  );
  console.log(JSON.stringify(oldAssets, null, 2));
  for (const oldAsset of oldAssets) {
    await octokit.rest.repos.deleteReleaseAsset({
      owner,
      repo,
      asset_id: oldAsset.id,
    });
  }

  // upload new asset
  const r2 = await octokit.rest.repos.uploadReleaseAsset({
    owner,
    repo,
    release_id,
    name: 'hello.txt',
    data: 'world',
  });
  console.log(JSON.stringify(r2, null, 2));
};

main();
