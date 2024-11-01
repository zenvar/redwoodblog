import type { EditArticleById, UpdateArticleInput } from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

type FormArticle = NonNullable<EditArticleById['article']>

interface ArticleFormProps {
  article?: EditArticleById['article']
  onSave: (data: UpdateArticleInput, id?: FormArticle['id']) => void
  error: RWGqlError
  loading: boolean
}

const ArticleForm = (props: ArticleFormProps) => {
  const onSubmit = (data: FormArticle) => {
    props.onSave(data, props?.article?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormArticle> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="articleUrl"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Article url
        </Label>

        <TextField
          name="articleUrl"
          defaultValue={props.article?.articleUrl}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="articleUrl" className="rw-field-error" />

        <Label
          name="dataSourceId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Data source id
        </Label>

        <TextField
          name="dataSourceId"
          defaultValue={props.article?.dataSourceId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="dataSourceId" className="rw-field-error" />

        <Label
          name="content"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Content
        </Label>

        <TextField
          name="content"
          defaultValue={props.article?.content}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="content" className="rw-field-error" />

        <Label
          name="rawHtml"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Raw html
        </Label>

        <TextField
          name="rawHtml"
          defaultValue={props.article?.rawHtml}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="rawHtml" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ArticleForm
