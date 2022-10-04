// Node
import { writeFile } from "fs/promises";
import { join } from "path";

// Externals
import { format } from "prettier";

// Internals
import pkg from "../../package.json";
import { PACKAGE_NAME, REPO_NAME, REPO_OWNER } from "../helpers/constants";

const PACKAGE_PATH = join(__dirname, "..", "..", "package.json");

const prePostGithubPublish = async () => {
  const isPre = process.env.IS_PRE_PUBLISH === "true";

  const data = {
    ...pkg,
    name: isPre ? `@${REPO_OWNER}/${REPO_NAME}` : PACKAGE_NAME,
  };
  const stringified = JSON.stringify(data);
  const formatted = format(stringified, {
    parser: "json-stringify",
  });

  await writeFile(PACKAGE_PATH, formatted);
};

prePostGithubPublish();
