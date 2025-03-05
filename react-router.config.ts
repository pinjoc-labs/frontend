import type { Config } from '@react-router/dev/config';

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  browserNodeBuiltinsPolyfill: {
    modules: { buffer: true, events: true, http: true },
  },
  ssr: false,
} satisfies Config;
