import EditArticleCell from 'src/components/Article/EditArticleCell'

type ArticlePageProps = {
  id: string
}

const EditArticlePage = ({ id }: ArticlePageProps) => {
  return <EditArticleCell id={id} />
}

export default EditArticlePage
