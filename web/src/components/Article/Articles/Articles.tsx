import type {
  DeleteArticleMutation,
  DeleteArticleMutationVariables,
  FindArticles,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Article/ArticlesCell'
import { truncate } from 'src/lib/formatters'

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

const ArticlesList = ({ articles }: FindArticles) => {
  const [deleteArticle] = useMutation(DELETE_ARTICLE_MUTATION, {
    onCompleted: () => {
      toast.success('Article deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteArticleMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete article ' + id + '?')) {
      deleteArticle({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Article url</th>
            <th>Time</th>
            <th>Header</th>
            <th>Data source id</th>
            <th>Content</th>
            <th>Raw html</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id}>
              <td>{truncate(article.id)}</td>
              <td>{truncate(article.articleUrl)}</td>
              <td>{truncate(article.time)}</td>
              <td>{truncate(article.header)}</td>
              <td>{truncate(article.dataSourceId)}</td>
              <td>{truncate(article.content)}</td>
              <td>{truncate(article.rawHtml)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.article({ id: article.id })}
                    title={'Show article ' + article.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editArticle({ id: article.id })}
                    title={'Edit article ' + article.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete article ' + article.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(article.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ArticlesList
