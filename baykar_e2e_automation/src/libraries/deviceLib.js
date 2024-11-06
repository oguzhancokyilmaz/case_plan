class DeviceLib {
    constructor() {
      this.device = 'desktop'
      this.url = ''
    }
  
    setDevice(newDevice) {
      if (
        newDevice.toLowerCase() !== 'mobileweb' &&
        newDevice.toLowerCase() !== 'desktop'
      ) {
        throw new Error('Platform not specified correctly')
      }
  
      this.device = newDevice.toLowerCase()
      return this.device
    }
  
    setURL(URL) {
      this.url = URL
    }
  
    isMobile() {
      return this.device === 'mobileweb'
    }
  
    isDesktop() {
      return this.device === 'desktop'
    }
  
    getUrl() {
      return this.url
    }
  }
  
  export default new DeviceLib()