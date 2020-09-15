import useProfilePhoto from 'services/providers/ProfilePhoto'

const ProfilePhotoService = ({ children }) => children(useProfilePhoto())

export default ProfilePhotoService
