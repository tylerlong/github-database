import {Octokit} from '@octokit/core';
import {restEndpointMethods} from '@octokit/plugin-rest-endpoint-methods';
import {Api} from '@octokit/plugin-rest-endpoint-methods/dist-types/types';
import hyperid from 'hyperid';

const uuid = hyperid();

const MyOctokit = Octokit.plugin(restEndpointMethods);

type GitHubDatabaseOptions = {
  token: string;
  owner: string;
  repo: string;
  releaseTag: string;
};

class GitHubDatabase {
  options: GitHubDatabaseOptions;
  octokit: Octokit & Api;
  releaseId: number | null = null;

  constructor(options: GitHubDatabaseOptions) {
    this.options = options;
    this.octokit = new MyOctokit({auth: process.env.GH_TOKEN});
  }

  async init() {
    try {
      const r = await this.octokit.rest.repos.getReleaseByTag({
        owner: this.options.owner,
        repo: this.options.repo,
        tag: this.options.releaseTag,
      });
      this.releaseId = r.data.id;
    } catch (e) {
      const r = await this.octokit.rest.repos.createRelease({
        owner: this.options.owner,
        repo: this.options.repo,
        tag_name: this.options.releaseTag,
      });
      this.releaseId = r.data.id;
    }
  }

  async put(value: string): Promise<number> {
    const r = await this.octokit.rest.repos.uploadReleaseAsset({
      owner: this.options.owner,
      repo: this.options.repo,
      release_id: this.releaseId!,
      name: `${uuid()}.txt`,
      data: value,
    });
    return r.data.id;
  }

  async get(id: number) {
    await this.octokit.rest.repos.getReleaseAsset({
      owner: this.options.owner,
      repo: this.options.repo,
      asset_id: id,
    });
  }
}

export default GitHubDatabase;
