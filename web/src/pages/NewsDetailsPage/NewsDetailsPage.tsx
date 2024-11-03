import { useQuery } from '@redwoodjs/web'
import { gql } from 'graphql-tag'
import type { Article } from 'types/graphql'
import { useParams } from '@redwoodjs/router'
import '../News/NewsPage.css'

const ARTICLE_DETAIL_QUERY = gql`
  query ArticleDetailQuery($id: String!) {
    article(id: $id) {
      id
      header
      content
      time
      rawHtml
      dataSourceId
    }
  }
`

const NewsDetailPage: React.FC = () => {
  const { id } = useParams() // No type argument here
  const { data, loading, error } = useQuery<{ article: Article }>(ARTICLE_DETAIL_QUERY, {
    variables: { id },
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error loading article</div>

  const { header, content, time, rawHtml, dataSourceId } = data!.article

  return (
    <div className="container">
      <header>
        <h1>{header}</h1>
        <p><strong>Published:</strong> {time}</p>
        <p><strong>Source ID:</strong> {dataSourceId}</p>
      </header>
      <div className="article-content" dangerouslySetInnerHTML={{ __html: rawHtml }}></div>
    </div>
  )
}

export default NewsDetailPage
