import packageJson from '../../../package.json'

export const useMetaApp = () => {
  return {
    version: packageJson.version,
    name: packageJson.name,
    releaseTime: packageJson.releaseTime,
    author: packageJson.author,
    mode: import.meta.env.MODE, // development/production
  }
}
