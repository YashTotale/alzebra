// Node
import { basename, join } from "path";
import { writeFile, rm } from "fs/promises";

// Externals
import recursive from "recursive-readdir";

const postbuild = async (): Promise<void> => {
  try {
    await Promise.all([createIndexFile(), removeTypings()]);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

const createIndexFile = async (): Promise<void> => {
  const index = `'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./alzebra.min.js');
} else {
  module.exports = require('./alzebra.js');
}
`;
  await writeFile(join("dist", "index.js"), index);
};

const removeTypings = async (): Promise<void> => {
  const keepTypings = ["index.d.ts", "types.d.ts"];

  const distFiles = await recursive("dist");

  await Promise.all(
    distFiles.map(async (file) => {
      if (file.length > 5) {
        const ending = file.substring(file.length - 5);
        if (ending === ".d.ts" && !keepTypings.includes(basename(file))) {
          await rm(file);
        }
      }
    })
  );
};

postbuild();
