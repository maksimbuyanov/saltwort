import { FC, useEffect } from "react"
import { useDispatch, useStore } from "react-redux"
import {
  ReduxStoreWithManager,
  StateSchemaKey,
} from "@/app/providers/StoreProvider"
import { Reducer } from "@reduxjs/toolkit"

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer
}

interface DynamicModuleLoaderProps {
  reducers: ReducersList
  removeAfterUnmount?: boolean
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = props => {
  const { children, reducers, removeAfterUnmount } = props
  const dispatch = useDispatch()
  const store = useStore() as ReduxStoreWithManager
  useEffect(() => {
    Object.entries(reducers).forEach(([name, value]) => {
      store.reducerManager.add(name as StateSchemaKey, value)
      dispatch({ type: `@INIT ${name}` })
    })

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([key]) => {
          dispatch({ type: `@DESTROY ${key}` })
          store.reducerManager.remove(key as StateSchemaKey)
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <>{children}</>
}
