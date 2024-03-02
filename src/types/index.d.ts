/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="../../.astro/types" />
/// <reference types="astro" />

export type Post = import('astro:content').CollectionEntry<'posts'>

export type Page = import('astro').Page<Post>

export type SiteMeta = {
  title: string
  description?: string
  isIndex?: boolean
}
