import { allPosts } from ".contentlayer/data";
import { useMDXComponent } from "next-contentlayer/hooks";
import { useState } from "react";

const Counter = ({ initial = 0}) => {
  const [counter, setCounter] = useState(initial);
  return (
    <div>
      Counter: {counter}
      <button type="button" onClick={() => setCounter(cur => cur + 1)}>+</button>
    </div>
  )
}

const mdxComponents = {
  h1: (props: any) => <h1 style={{background: "red"}}>{props.children}</h1>,
  code: (props: any) => <pre>{JSON.stringify(props, null, 2)}</pre>,
  CTA: (props: any) => <button>{props.title}</button>,
  Counter,
}

const BlogPost = (props: any) => {
  const Component = useMDXComponent(props.post.body.code);

  return (
    <div>
      <h1>{props.post.title}</h1>
      <Component components={mdxComponents} />
    </div>
  );
};

export async function getStaticPaths() {
  return {
    paths: allPosts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const post = allPosts.find((post) => post.slug === params.slug);

  return {
    props: {
      post,
    },
  };
}

export default BlogPost;
