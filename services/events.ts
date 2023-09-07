const eventServices = {
    /**
     * Document service
     * @param req 
     * @param res 
     */
    async testEventServicesFunction(): Promise<String> {
        const testString: String = "event services reached";
        console.log(testString)
        return testString
    }
}

module.exports = eventServices