import gql from "graphql-tag";
import { QueryClient, dehydrate } from "react-query";
import {
  useGetPostsQuery,
  fetcher,
  GetPostsQuery,
  GetPostsQueryVariables,
  GetPostsDocument,
} from "./index.generated";

const getPosts = gql`
  query GetPosts {
    posts {
      nodes {
        id
        title
        excerpt
      }
    }
  }
`;

function Page() {
  const { data } = useGetPostsQuery();
  const nodes = data?.posts?.nodes ?? [];
  return (
    <main>
      <h1>All Posts</h1>
      {nodes.map((post) => {
        return (
          <>
            <div>{post.title}</div>
            <div>{post.excerpt}</div>
          </>
        );
      })}
    </main>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    ["GetPosts"],
    fetcher<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Page;
