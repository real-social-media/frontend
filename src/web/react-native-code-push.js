function codePush() {
  return (cmp) => cmp
}

codePush.sync = () => {}

codePush.getUpdateMetadata = () => Promise.resolve(undefined)

codePush.CheckFrequency = {
  ON_APP_RESUME: 'ON_APP_RESUME',
}

codePush.InstallMode = {
  ON_NEXT_RESUME: 'ON_NEXT_RESUME',
  IMMEDIATE: 'IMMEDIATE',
}

export default codePush
