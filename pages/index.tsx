import type { Photo } from "../types";
import { Tab } from "@headlessui/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import nodeFetch from "node-fetch";

import bg_img from "../public/p-bg.jpg";
import logo from "../public/logo.png";

import { GetStaticProps } from "next";
import { createApi } from "unsplash-js";
import { Gallery } from "../components/Gallery";
import { getImages } from "../utils/image-utils";
import { useMemo } from "react";

const tabs = [
  {
    key: "all",
    display: "All",
  },
  {
    key: "landscape",
    display: "Landscape",
  },
  {
    key: "contemporary",
    display: "Contemporary",
  },
];

type HomeProps = {
  landscape: Photo[];
  contemporary: Photo[];
};

export const getStaticProps: GetStaticProps<any> = async () => {
  const unsplash = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY!,
    fetch: nodeFetch as unknown as typeof fetch,
  });

  const [landscape, contemporary] = await Promise.all([
    getImages(unsplash, "landscape"),
    getImages(unsplash, "contemporary"),
  ]);

  return {
    props: {
      landscape,
      contemporary,
    },
    revalidate: 10,
  };
};

export default function Home({ landscape, contemporary }: HomeProps) {

  const allPhotos = useMemo(() => {
    const all = [...landscape, ...contemporary]
    return all.sort((a, b) => b.likes - a.likes)
  }, [landscape, contemporary])

  return (
    <div className="h-full overflow-auto">
      <Head>
        <title>Rritam Mitra</title>
        <meta name="description" content="Photography Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Image
        className="fixed right-0 bottom-0 z-0"
        src={bg_img}
        alt=""
        placeholder="blur"
      />

      <div className="fixed left-0 top-0 w-full h-full z-10 from-dark bg-gradient-to-t"></div>

      <header className="fixed top-0 w-full z-30 flex justify-between items-center h-[90px] px-10">
        <Link href="#">
          <Image
            src={logo}
            width={190}
            height={50}
            alt="Rritam Mitra"
            className="transition-opacity opacity-0 duration-[2s]"
            onLoadingComplete={(image) => image.classList.remove("opacity-0")}
          />
        </Link>
        <Link
          href="#"
          className="rounded-3xl bg-light text-dark px-3 py-2 hover:bg-opacity-90 font-semibold"
        >
          Get in touch
        </Link>
      </header>

      <main className="relative pt-[100px] z-20">
        <div className="flex flex-col items-center h-full">
          <Tab.Group>
            <Tab.List className="flex items-center gap-12">
              {tabs.map((tab) => (
                <Tab key={tab.key} className="p-2">
                  {({ selected }) => (
                    <span
                      className={classNames(
                        "uppercase text-md",
                        selected ? "text-light" : "text-semilight"
                      )}
                    >
                      {tab.display}
                    </span>
                  )}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="h-full max-w-[900px] w-full p-2 sm:p-4 my-6">
              <Tab.Panel className="overflow-auto">
                <Gallery photos={allPhotos} />
              </Tab.Panel>
              <Tab.Panel>
                <Gallery photos={landscape} />
              </Tab.Panel>
              <Tab.Panel>
                <Gallery photos={contemporary} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </main>

      <footer className="relative h-[90px] flex justify-center items-center z-20">
        <p>© 2024 - rritammitra59@gmail.com</p>
      </footer>
    </div>
  );
}
