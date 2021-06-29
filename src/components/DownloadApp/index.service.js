import { useNavigation } from '@react-navigation/native'

const DownloadAppService = ({ children }) => {
  const navigation = useNavigation()
  const handleClose = () => navigation.popToTop()

  return children({
    handleClose,
  })
}

export default DownloadAppService
