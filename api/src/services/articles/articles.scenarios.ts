import type { Prisma, article } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.articleCreateArgs>({
  article: {
    one: {
      data: {
        articleUrl: 'String',
        time: 'String',
        header: 'String',
        dataSourceId: 'String',
        content: 'String',
        rawHtml: 'String',
      },
    },
    two: {
      data: {
        articleUrl: 'String',
        time: 'String',
        header: 'String',
        dataSourceId: 'String',
        content: 'String',
        rawHtml: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<article, 'article'>
