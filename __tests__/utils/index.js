import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

export * from '@testing-library/react-native'
export * from './render'
export * from './helpers'

dayjs.extend(relativeTime)
