import React from "react"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { ThemeDecorator } from "@/shared/config/storybook/styleDecorator/ThemeDecorator"
import { Theme } from "@/app/providers/ThemeProvider"
import { Input } from "./Input"

export default {
  title: "shared/Input",
  component: Input,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = args => <Input {...args} />

export const Default = Template.bind({})
Default.args = {
  placeholder: "some >",
  value: "text",
}
export const DefaultDark = Template.bind({})
DefaultDark.args = { placeholder: "some >", value: "text" }
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)]

export const WithoutPlaceholder = Template.bind({})
WithoutPlaceholder.args = {
  value: "text",
}
export const WithoutPlaceholderDark = Template.bind({})
WithoutPlaceholderDark.args = { value: "text" }
WithoutPlaceholderDark.decorators = [ThemeDecorator(Theme.DARK)]
