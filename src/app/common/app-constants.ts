export const Constants={
    ApiCalls:{
        getProductsList:"/products",
        createProduct:"/products",
        updateProduct:"/products/{0}",
        getProduct:"/products/{0}",
        getDeploymentUnitById: "/products/{0}/deploymentunits/{1}",
        getDeploymentUnitsByProductId: "/products/{0}/deploymentunits",
        createDeploymentUnit:"/products/{0}/deploymentunits",
        updateDeploymentUnit:"/products/{0}/deploymentunits/{1}"
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