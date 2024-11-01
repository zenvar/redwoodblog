import type {
  EditArticleById,
  UpdateArticleInput,
  UpdateArticleMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ArticleForm from 'src/components/Article/ArticleForm'

export const QUERY: TypedDocumentNode<EditArticleById> = gql`
  query EditArticleById($id: String!) {
    article: article(id: $id) {
      id
      articleUrl
      dataSourceId
      content
      rawHtml
    }
  }
`

const UPDATE_ARTICLE_MUTATION: TypedDocumentNode<
  EditArticleById,
  UpdateArticleMutationVariables
> = gql`
  mutation UpdateArticleMutation($id: String!, $input: UpdateArticleInput!) {
    updateArticle(id: $id, input: $input) {
      id
      articleUrl
      dataSourceId
      content
      rawHtml
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ article }: CellSuccessProps<EditArticleById>) => {
  const [updateArticle, { loading, error }] = useMutation(
    UPDATE_ARTICLE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Article updated')
        navigate(routes.articles())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateArticleInput,
    id: EditArticleById['article']['id']
  ) => {
    updateArticle({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Article {article?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ArticleForm
          article={article}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
