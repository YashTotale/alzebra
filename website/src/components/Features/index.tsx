/* eslint-disable @typescript-eslint/no-var-requires */
import React, { FC, ReactElement } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

const features = [
  {
    icon: "📦",
    title: "Lightweight & Easy to Use",
    description: (
      <>
        Alzebra was designed from scratch to be easily installed and integrated
        into your application seamlessly.
      </>
    ),
  },
  {
    icon: "🌟",
    title: "Bug Free",
    description: (
      <>
        Alzebra is typed thoroughly and tested entirely with Jest. Each change
        Alzebra through automated GitHub Workflows to ensure that the package
        remains high quality and functional.
      </>
    ),
  },
  {
    icon: "🚀",
    title: "Lightning Fast",
    description: (
      <>
        Alzebra&apos;s zipped size is less than 2kB. If speed matters, Alzebra
        is for you.
      </>
    ),
  },
];

interface FeatureProps {
  icon: string;
  title: string;
  description: ReactElement;
}

const Feature: FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className={clsx("col col--4", styles.feature)}>
      <div className="text--center">
        <h1 className={styles.featureIcon}>{icon}</h1>
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

const Features: FC = () => {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {features.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
