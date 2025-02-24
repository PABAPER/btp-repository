sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller) {
    "use strict";

    return Controller.extend("employeemb.controller.CreateEmployee", {
        onInit: function() {
            // Initialize if needed
        },

        onSavePress: function() {
            var sEmpId = this.getView().byId("empId").getValue();
            var sEmpAge = this.getView().byId("empAge").getValue();
            var sEmpComp = this.getView().byId("empComp").getValue()
            var sEmpFName = this.getView().byId("empFName").getValue();
            var sEmpLName = this.getView().byId("empLName").getValue();
            var sEmpJDate = this.getView().byId("joiningDate").getDateValue();
            var sEmpNum = this.getView().byId("empNum").getValue();

            var iTimestamp = sEmpJDate.toISOString().slice(0, 19);

            const oNewData = {
                Empid: sEmpId,
                Empcomp: sEmpComp,
                Empfname: sEmpFName,
                Emplname: sEmpLName,
                Empage: sEmpAge,
                Empjdate: iTimestamp,
                // Empjdate: "/Date(1676112000000)/",
                Empnum: sEmpNum
            }

            if (!sEmpId) {
                sap.m.MessageToast.show("Please enter the Employee ID");
                return;
            }

            var oModel = this.getOwnerComponent().getModel();
            oModel.create("/ZR_MB_EMP_ODATA", oNewData, {
                success: function () {
                    sap.m.MessageToast.show("Employee " + sEmpId + " saved successfully!");
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("RouteView1");  // Navigate back
                        },
                error: function (oError) {
                    sap.m.MessageToast.show("Error creating record.");                                      
                }
            });
        },

        onCancelPress: function() {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteView1");  // Navigate back
        }
    });
});