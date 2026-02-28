import packageJson from '../../../package.json'

export const useMetaApp = () => {
  return {
    version: packageJson.version,
    name: packageJson.name,
    buildTime: packageJson.buildTime,
    author: packageJson.author,
    mode: import.meta.env.MODE, // development/production
  }
}
