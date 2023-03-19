import { memo, ReactNode } from "react"
import cls from "./PageError.module.scss"
import { classNames } from "@/shared/lib"
import { useTranslation } from "react-i18next"
import { Button, ButtonTheme } from "@/shared/ui"

interface PageErrorProps {
  className?: string
  children?: ReactNode
}

export const PageError = (props: PageErrorProps) => {
  const { className = "" } = props
  const { t } = useTranslation()
  const reloadPage = (): void => {
    location.reload()
  }
  return (
    <div className={classNames(cls.PageError, {}, [className])}>
      {t("Произошла непредвиденная ошибка")}
      <Button onClick={reloadPage} theme={ButtonTheme.ERROR}>
        {t("Обновить страницу")}
      </Button>
    </div>
  )
}

export default memo(PageError)
