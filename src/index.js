/**
 * WRB-TV premium public website.
 * Static files are served by Cloudflare Workers Static Assets.
 * This handler is retained as the Workers entry point and delegates
 * any requests that reach it to the ASSETS binding.
 */
export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  },
};
