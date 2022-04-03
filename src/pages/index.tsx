import { useGetPostsQuery } from './posts.generated';

function Page() {
  const { data } = useGetPostsQuery();
  const nodes = data?.posts?.nodes ?? [];
  return (
  <main>
    <h1>All Posts</h1>
    {
      nodes.map((post) => {
        return (
          <>
            <div>{post.title}</div>
            <div>{post.excerpt}</div>
          </>
        )
      })
    }
  </main>
  )
}

export default Page;