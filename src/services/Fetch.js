import Axios from 'axios'

export function* getRequest({ url, params }) {
    return yield Axios.get(url, { params })
}