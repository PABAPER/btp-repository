sap.ui.define([
    "sap/ui/core/UIComponent",
    "employeemb/model/models",
    "sap/ui/model/odata/v2/ODataModel"
], (UIComponent, models, ODataModel) => {
    "use strict";

    return UIComponent.extend("employeemb.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // enable routing
            this.getRouter().initialize();
        }
    });
});