import type { FindArticles, FindArticlesVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Articles from 'src/components/Article/Articles'

export const QUERY: TypedDocumentNode<FindArticles, FindArticlesVariables> =
  gql`
    query FindArticles {
      articles {
        id
        articleUrl
        time
        header
        dataSourceId
        content
        rawHtml
      }
    }
  `

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      No articles yet.{' '}
      <Link to={routes.newArticle()} className="rw-link">
        Create one?
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindArticles>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  articles,
}: CellSuccessProps<FindArticles, FindArticlesVariables>) => {
  return <Articles articles={articles} />
}
