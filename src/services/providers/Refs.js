import { useRef } from 'react'
import path from 'ramda/src/path'

export const useRefs = ({ keyPath }) => {
  const refs = useRef({})

  const getRef = (input) => refs.current[path(keyPath, input)]

  const createRef = (input) => (element) => {
    if (!refs.current[path(keyPath, input)]) {
      refs.current[path(keyPath, input)] = element
    }
  }

  return {
    refs,
    getRef,
    createRef,
  }
}

export default useRefs
