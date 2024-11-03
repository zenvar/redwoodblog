import type {
  DeleteArticleMutation,
  DeleteArticleMutationVariables,
  FindArticleById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import {} from 'src/lib/formatters'

const DELETE_ARTICLE_MUTATION: TypedDocumentNode<
  DeleteArticleMutation,
  DeleteArticleMutationVariables
> = gql`
  mutation DeleteArticleMutation($id: String!) {
    deleteArticle(id: $id) {
      id
    }
  }
`

interface Props {
  article: NonNullable<FindArticleById['article']>
}

const Article = ({ article }: Props) => {
  const [deleteArticle] = useMutation(DELETE_ARTICLE_MUTATION, {
    onCompleted: () => {
      toast.success('Article deleted')
      navigate(routes.articles())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteArticleMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete article ' + id + '?')) {
      deleteArticle({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Article {article.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{article.id}</td>
            </tr>
            <tr>
              <th>Article url</th>
              <td>{article.articleUrl}</td>
            </tr>
            <tr>
              <th>Time</th>
              <td>{article.time}</td>
            </tr>
            <tr>
              <th>Header</th>
              <td>{article.header}</td>
            </tr>
            <tr>
              <th>Data source id</th>
              <td>{article.dataSourceId}</td>
            </tr>
            <tr>
              <th>Content</th>
              <td>{article.content}</td>
            </tr>
            <tr>
              <th>Raw html</th>
              <td>{article.rawHtml}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editArticle({ id: article.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(article.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Article
