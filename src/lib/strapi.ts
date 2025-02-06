import { fetchApi } from "@lib/api";
import type { Post, PostData } from "../interfaces/post";
import type { Site, SiteData } from "../interfaces/site";
import type { CategriesData } from "../interfaces/category";

const nativePostsData: PostData[] = await fetchApi<PostData[]>({
  endpoint: "posts",
  query: {
    // "filters[site][name]": "KnowledgeNavs",
    sort: "updatedAt:desc",
    populate: "*",
  },
  wrappedByKey: "data",
});

const siteData: SiteData[] = await fetchApi<SiteData[]>({
  endpoint: "sites",
  query: {
    // "filters[name]": "KnowledgeNavs",
    populate: "*",
  },
  wrappedByKey: "data",
});

console.log(siteData[0])

export const nativePosts: Post[] = nativePostsData.map((post) => {
  return {
    id: post.id,
    title: post.attributes.title,
    slug: post.attributes.slug,
    content: post.attributes.content,
    author: post.attributes.author,
    categories: post.attributes.categories.data.map(
      (category) => category?.attributes?.name || "",
    ),
    imageUrl: post.attributes.image.data?.attributes?.url || null,
    imageWidth: post.attributes.image.data?.attributes?.width || null,
    imageHeight: post.attributes.image.data?.attributes?.height || null,
    imageSmallUrl:
      post.attributes.image.data?.attributes?.formats?.small?.url || null,
    imageSmallWidth:
      post.attributes.image.data?.attributes?.formats?.small?.width || null,
    imageSmallHeight:
      post.attributes.image.data?.attributes?.formats?.small?.height || null,
    imageMediumUrl:
      post.attributes.image.data?.attributes?.formats?.medium?.url || null,
    imageMediumWidth:
      post.attributes.image.data?.attributes?.formats?.medium?.width || null,
    imageMediumHeight:
      post.attributes.image.data?.attributes?.formats?.medium?.height || null,
    createdAt: post.attributes.createdAt,
    updatedAt: post.attributes.updatedAt,
    publishedAt: post.attributes.publishedAt,
  };
});

export const site: Site[] = siteData.map((site) => {
  return {
    id: site.id,
    name: site.attributes.name,
    slug: site.attributes.slug,
    termsOfService: site.attributes.termsOfService,
    privacyPolicy: site.attributes.privacyPolicy,
    dcma: site.attributes.dcma,
    cookiePolicy: site.attributes.cookiePolicy,
    ccpa: site.attributes.ccpa,
    aboutUs: site.attributes.aboutUs,
    createdAt: site.attributes.createdAt,
    updatedAt: site.attributes.updatedAt,
  };
});

export const categories: CategriesData[] = (
  await fetchApi<CategriesData[]>({
    endpoint: "categories",
    query: {
      populate: "*",
    },
    wrappedByKey: "data",
  })
).filter(
  (cat) =>
    !!cat.attributes.sites.data.filter(
      (site) => site.attributes.name === "ABCVentures",
    ).length,
);
