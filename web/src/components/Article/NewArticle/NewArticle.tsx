import type {
  CreateArticleMutation,
  CreateArticleInput,
  CreateArticleMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ArticleForm from 'src/components/Article/ArticleForm'

const CREATE_ARTICLE_MUTATION: TypedDocumentNode<
  CreateArticleMutation,
  CreateArticleMutationVariables
> = gql`
  mutation CreateArticleMutation($input: CreateArticleInput!) {
    createArticle(input: $input) {
      id
    }
  }
`

const NewArticle = () => {
  const [createArticle, { loading, error }] = useMutation(
    CREATE_ARTICLE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Article created')
        navigate(routes.articles())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateArticleInput) => {
    createArticle({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Article</h2>
      </header>
      <div className="rw-segment-main">
        <ArticleForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewArticle
