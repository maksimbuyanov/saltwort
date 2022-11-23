import { fetchArticleById } from "./fetchArticleById"
import { TestAsyncThunk } from "@/shared/lib/TestAsyncThunk/TestAsyncThunk"
import { Article, ArticleBlockType, ArticleType } from "../../types/article"
import image from "@/shared/assets/forTests/user.png"

describe("fetchArticleById", () => {
  const article: Article = {
    id: "1",
    title: "Песня про Антошку",
    user: {
      id: "1",
      username: "TwitterChief",
      avatar: image,
    },
    image: "https://i.ytimg.com/vi/AotASl25CCg/maxresdefault.jpg",
    subtitle: "который не очень любит работать",
    views: 2020,
    createdAt: "26.10.2022",
    type: [ArticleType.ABOUT_BOY, ArticleType.RUSSIAN],
    blocks: [
      {
        id: "1",
        type: ArticleBlockType.TEXT,
        title: "TITLE OF THE PERFECT BLOCK",
        paragraphs: [
          "Антошка Антошка",
          "Пойдем копать картошку",
          "Антошка Антошка",
          "Пойдем копать карто-о-шку",
        ],
      },
      {
        id: "2",
        type: ArticleBlockType.TEXT,
        title: "Второй куплет",
        paragraphs: [
          "Ти ли ти ли",
          "Тра ли вали",
          "Это мы не проходили",
          "Это нам не задавали",
        ],
      },
      {
        id: "3",
        type: ArticleBlockType.IMAGE,
        title: "Тот самый Антошка",
        src: "https://skazki.land/api/get-resized-image/antoshka-289f5.jpg?width=1024&height=1024&fit=inside",
      },
      {
        id: "4",
        type: ArticleBlockType.CODE,
        code: 'import React from "react"\nimport { ComponentMeta, ComponentStory } from "@storybook/react"\nimport { ThemeDecorator } from "@/shared/config/storybook/styleDecorator/ThemeDecorator"\nimport { Theme } from "@/app/providers/ThemeProvider"\nimport { Select } from "./Select"\n\nexport default {\n  title: "shared/Select",\n  component: Select,\n  argTypes: {\n    backgroundColor: { control: "color" },\n  },\n  args: {\n    label: "Test text",\n    options: [\n      { value: "123", content: "123" },\n      { value: "11123", content: "11123" },\n    ],\n  },\n} as ComponentMeta<typeof Select>\n\nconst Template: ComponentStory<typeof Select> = args => <Select {...args} />\n\nexport const Light = Template.bind({})\n\nexport const ReadOnly = Template.bind({})\nReadOnly.args = {\n  readOnly: true,\n}\n\nexport const Dark = Template.bind({})\nDark.decorators = [ThemeDecorator(Theme.DARK)]\n\nexport const Blood = Template.bind({})\nBlood.decorators = [ThemeDecorator(Theme.BLOOD)]\n',
      },
    ],
  }
  test("success with class", async () => {
    const thunk = new TestAsyncThunk(fetchArticleById)
    thunk.api.get.mockReturnValue(Promise.resolve({ data: article }))
    const result = await thunk.callThunk(`1`)
    expect(thunk.api.get).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe("fulfilled")
    expect(result.payload).toEqual(article)
  })

  test("error with class", async () => {
    const thunk = new TestAsyncThunk(fetchArticleById)
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }))
    const result = await thunk.callThunk(`1`)
    expect(thunk.api.get).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe("rejected")
    expect(result.payload).toBe("error article")
  })
})
