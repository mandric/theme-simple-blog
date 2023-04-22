import lume from "lume/mod.ts";
import plugins from "./plugins.ts";

const site = lume({
  src: "./src",
});

site.use(plugins());
site.copyRemainingFiles();

export default site;
