import {Octokit} from '@octokit/core';
import {restEndpointMethods} from '@octokit/plugin-rest-endpoint-methods';
import {Api} from '@octokit/plugin-rest-endpoint-methods/dist-types/types';

const MyOctokit = Octokit.plugin(restEndpointMethods);

type GistS3Options = {
  personalAccessToken: string;
  gistId: string;
};

class GistS3 {
  octokit: Octokit & Api;
  gistId: string;

  constructor(options: GistS3Options) {
    this.octokit = new MyOctokit({auth: options.personalAccessToken});
    this.gistId = options.gistId;
  }

  async put(filename: string, content: string) {
    await this.octokit.rest.gists.update({
      gist_id: this.gistId,
      files: {
        [filename]: {content},
      },
    });
  }

  async get(filename: string): Promise<string | undefined> {
    const r = await this.octokit.rest.gists.get({
      gist_id: this.gistId,
    });
    return r.data.files?.[filename]?.content;
  }
}

export default GistS3;
