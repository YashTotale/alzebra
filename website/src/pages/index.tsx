import React, { FC } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Layout from "@theme/Layout";
import Features from "@site/src/components/Features";
import styles from "./index.module.css";

const Hero: FC = () => {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <img
          className={clsx(styles.heroBannerLogo)}
          src={useBaseUrl("img/icon.svg")}
        />
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className={clsx("button button--secondary button--lg")}
            to={useBaseUrl("docs/")}
          >
            Get Started&nbsp;&nbsp;→
          </Link>
        </div>
      </div>
    </header>
  );
};

const Home: FC = () => {
  return (
    <Layout title="Home" description="Quick and Easy Gaussian Elimination">
      <Hero />
      <main>
        <Features />
      </main>
    </Layout>
  );
};

export default Home;
