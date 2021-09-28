declare module 'netlify' {
  class NetlifyApi {
    constructor(token: string);
    getAccessToken(...args: any[]): Promise<string | undefined>;
    createTicket(config: any): Promise<any>;
    getCurrentUser(): Promise<any>;
    listAccountsForUser(): Promise<any[]>;
    createSiteInTeam(args: any): Promise<any>;
    createDeployKey(): Promise<any>;
    updateSite(args: any): Promise<any>;
    listHooksBySiteId(args: any): Promise<any[]>;
    createHookBySiteId(args: any): Promise<any>;
  }

  export = NetlifyApi;
}
