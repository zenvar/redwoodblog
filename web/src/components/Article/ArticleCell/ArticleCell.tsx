import type { FindArticleById, FindArticleByIdVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Article from 'src/components/Article/Article'

export const QUERY: TypedDocumentNode<
  FindArticleById,
  FindArticleByIdVariables
> = gql`
  query FindArticleById($id: String!) {
    article: article(id: $id) {
      id
      articleUrl
      dataSourceId
      content
      rawHtml
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Article not found</div>

export const Failure = ({
  error,
}: CellFailureProps<FindArticleByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  article,
}: CellSuccessProps<FindArticleById, FindArticleByIdVariables>) => {
  return <Article article={article} />
}
