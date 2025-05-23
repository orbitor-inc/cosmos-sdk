import { CosmosClientOptions, CosmosContent } from './types';

export class CosmosClient {
  private readonly options: Required<CosmosClientOptions>;

  constructor(options: CosmosClientOptions) {
    this.options = {
      protocol: 'https',
      jsonDomain: 'cdn.cosmos-cms.io',
      hostingDomain: 'hosting.cosmos-cms.io',
      ...options
    };
  }

  // URL generators
  public getJsonUrl(projectSlug: string, path: string = ''): string {
    return this.buildUrl(this.options.jsonDomain, projectSlug, path);
  }

  public getHostedUrl(projectSlug: string, path: string = ''): string {
    return this.buildUrl(this.options.hostingDomain, projectSlug, path);
  }

  // Content fetchers
  public async getJsonContent(projectSlug: string, path: string = ''): Promise<CosmosContent> {
    const url = this.getJsonUrl(projectSlug, path);
    return this.fetchContent(url);
  }

  public async getHostedContent(projectSlug: string, path: string = ''): Promise<string> {
    const url = this.getHostedUrl(projectSlug, path);
    return this.fetchContent(url, 'text');
  }

  // Private helpers
  private buildUrl(domain: string, projectSlug: string, path: string): string {
    const cleanPath = path.replace(/^\//, '');
    return `${this.options.protocol}://${this.options.organizationSlug}.${domain}/${projectSlug}/${cleanPath}`;
  }

  private async fetchContent(url: string, responseType: 'json' | 'text' = 'json'): Promise<any> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return responseType === 'json' ? response.json() : response.text();
  }
}

// Convenience function
export function createCosmosClient(options: CosmosClientOptions): CosmosClient {
  return new CosmosClient(options);
}