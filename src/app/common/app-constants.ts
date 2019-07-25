export const Constants={
    ApiCalls:{
        getProductsList:"/products",
        createProduct:"/products",
        updateProduct:"/products/{0}",
        getProduct:"/products/{0}",
        getDeploymentUnitById: "/products/{0}/deploymentunits/{1}",
        getDeploymentUnitsByProductId: "/products/{0}/deploymentunits",
        createDeploymentUnit:"/products/{0}/deploymentunits",
        updateDeploymentUnit:"/products/{0}/deploymentunits/{1}",
        configureDeployUnitSettings:"/products/{0}/deploymentunits/{1}/configuresettings",
        getDeployUnitSettings:"/products/{0}/deploymentunits/{1}/settings",
        getEnvironmentById: "/products/{0}/environments/{1}",
        getEnvironmentByProductId: "/products/{0}/environments",
        createEnvironment:"/products/{0}/environments",
        updateEnvironment:"/products/{0}/environments/{1}",
        configureEnvironmentSettings:"/products/{0}/environments/{1}/configuresettings",
        getEnvironmentSettings:"/products/{0}/environments/{1}/settings",
        getSettingById: "/products/{0}/settings/{1}",
        getSettingByProductId: "/products/{0}/settings",
        createSetting:"/products/{0}/settings",
        updateSetting:"/products/{0}/settings/{1}"
    }
}
export enum ProtocolTypes{
    "HTTP" = 1,
    "HTTPS",
    "TCP"
}
export enum DUTypes{
    "Custom" = 1,
    "Third Party"
}
export enum ConfigSettingTypes{
    "Fixed" = 1,
    "Dynamic"
}