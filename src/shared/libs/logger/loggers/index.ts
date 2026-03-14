import { LoggerFactory } from '@shared/libs/logger'

const factory = LoggerFactory.getInstance()

export const uiLogger = factory.getLogger('UI')
export const systemLogger = factory.getLogger('SYSTEM')
export const pwaLogger = factory.getLogger('PWA')
export const apiLogger = factory.getLogger('API')
export const storeLogger = factory.getLogger('STORE')
export const logsLogger = factory.getLogger('LOGS')
export const authLogger = factory.getLogger('AUTH')
export const routerLogger = factory.getLogger('ROUTER')
