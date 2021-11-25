import { defineDocumentType, makeSource } from "contentlayer/source-files";

const computedFields = {
  slug: {
    type: "string",
    resolve: (document) => document._raw.sourceFileName.replace(/\.mdx$/, '')
  }
}

const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "blog/*.mdx",
  bodyType: "mdx",
  fields: {
    title: { type: "string", required: true },
  },
  computedFields
}))

export default makeSource({
  contentDirPath: "src/content",
  documentTypes: [Post],
  mdx: {},
});
