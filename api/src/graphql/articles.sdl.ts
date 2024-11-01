export const schema = gql`
  type Article {
    id: String!
    articleUrl: String!
    dataSourceId: String!
    content: String!
    rawHtml: String!
  }

  type Query {
    articles: [Article!]! @requireAuth
    article(id: String!): Article @requireAuth
  }

  input CreateArticleInput {
    articleUrl: String!
    dataSourceId: String!
    content: String!
    rawHtml: String!
  }

  input UpdateArticleInput {
    articleUrl: String
    dataSourceId: String
    content: String
    rawHtml: String
  }

  type Mutation {
    createArticle(input: CreateArticleInput!): Article! @requireAuth
    updateArticle(id: String!, input: UpdateArticleInput!): Article!
      @requireAuth
    deleteArticle(id: String!): Article! @requireAuth
  }
`
