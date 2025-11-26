export const Identifiers = { 
    services: {
        LoggerService: Symbol.for("services.LoggerService")
    },

    apiClients: {
        SmartFactoryApiClient: Symbol.for("apiClients.SmartFactoryApiClient"),
    },
    clients: {
        DevicesClient: Symbol.for("clients.DevicesClient"),
    },
    stores: {
        DevicesStore: Symbol.for("stores.DevicesStore"),
    }, 
 }