import * as Types from "../client/generated";

import { useQuery, UseQueryOptions } from "react-query";

export function fetcher<TData, TVariables>(
  query: string,
  variables?: TVariables
) {
  return async (): Promise<TData> => {
    const res = await fetch("http://localhost:10003/graphql", {
      method: "POST",
      ...{ headers: { "content-type": "application/json" } },
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  };
}
export type GetPostsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetPostsQuery = {
  __typename?: "RootQuery";
  posts?: {
    __typename?: "RootQueryToPostConnection";
    nodes?: Array<{
      __typename?: "Post";
      id: string;
      title?: string | null;
      excerpt?: string | null;
    } | null> | null;
  } | null;
};

export const GetPostsDocument = `
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
export const useGetPostsQuery = <TData = GetPostsQuery, TError = unknown>(
  variables?: GetPostsQueryVariables,
  options?: UseQueryOptions<GetPostsQuery, TError, TData>
) =>
  useQuery<GetPostsQuery, TError, TData>(
    variables === undefined ? ["GetPosts"] : ["GetPosts", variables],
    fetcher<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, variables),
    options
  );
