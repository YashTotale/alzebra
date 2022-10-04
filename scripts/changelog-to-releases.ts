// Node
import { readFile } from "fs/promises";
import { join } from "path";

// Externals
import { config } from "dotenv-safe";
import { Octokit, RestEndpointMethodTypes } from "@octokit/rest";

// Internals
import pkg from "../package.json";
import { REPO_NAME, REPO_OWNER } from "./helpers/constants";
import getChangeLogSection from "./helpers/get-changelog-section";

config();

const CHANGELOG_PATH = join(__dirname, "..", "CHANGELOG.md");

const changelogToReleases = async (): Promise<void> => {
  const changelog = (await readFile(CHANGELOG_PATH, "utf-8")).trim();

  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

  const [tags, releases] = await Promise.all([
    getTags(octokit),
    getReleases(octokit),
  ]);

  await Promise.all([
    createReleases(octokit, changelog, tags, releases),
    updateReleases(octokit, changelog, releases),
  ]);
};

type Releases =
  RestEndpointMethodTypes["repos"]["listReleases"]["response"]["data"];

type Tags = RestEndpointMethodTypes["repos"]["listTags"]["response"]["data"];

const getReleases = async (octokit: Octokit): Promise<Releases> => {
  const { data: releases } = await octokit.repos.listReleases({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    per_page: 10,
  });

  return releases;
};

const getTags = async (octokit: Octokit): Promise<Tags> => {
  const { data: tags } = await octokit.repos.listTags({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    per_page: 10,
  });
  return tags;
};

const createReleases = async (
  octokit: Octokit,
  changelog: string,
  tags: Tags,
  releases: Releases
): Promise<void> => {
  await Promise.all(
    tags.map(async ({ name, commit }) => {
      if (
        name === `v${pkg.version}` &&
        !releases.find(({ name: releaseName }) => name === releaseName)
      ) {
        console.log(`Creating release ${name}...`);
        await octokit.repos.createRelease({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          tag_name: name,
          body: getChangeLogSection(changelog, name.substring(1)),
          target_commitish: commit.sha,
          name,
          prerelease: false,
          draft: false,
        });
        console.log(`Created release ${name}!`);
      }
    })
  );
};

const updateReleases = async (
  octokit: Octokit,
  changelog: string,
  releases: Releases
): Promise<void> => {
  await Promise.all(
    releases.map(async (release) => {
      const { id, name, tag_name, body } = release;
      const section = getChangeLogSection(changelog, tag_name.substring(1));

      if (section !== body) {
        console.log(`Updating release ${name}...`);
        await octokit.repos.updateRelease({
          ...release,
          owner: REPO_OWNER,
          repo: REPO_NAME,
          release_id: id,
          body: section,
          name: name ?? undefined,
        });
        console.log(`Updated release ${name}!`);
      }
    })
  );
};

changelogToReleases();
