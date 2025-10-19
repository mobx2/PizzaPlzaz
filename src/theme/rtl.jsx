import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";

// Create rtl cache
export default function createRtlCache() {
  return createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
}
