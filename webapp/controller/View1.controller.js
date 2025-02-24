sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("employeemb.controller.View1", {
        onInit() {
            // var oTable = this.getView().byId("smartTable").getTable();
            // var oColumns = oTable.getColumns();

            // // Loop through columns to rename 'EmpAge' to 'Employee Age'
            // oColumns.forEach(function(oColumn) {
            //     if (oColumn.getId().includes("Empid")) {
            //         oColumn.setLabel(new sap.m.Label({ text: "Employee ID" }));
            //     }
            // });
            var oTable = this.getView().byId("smartTable").getTable();
            oTable.attachRowSelectionChange(this.onChange, this);
            this.loadEmployeeData();
        },
        loadEmployeeData : function () {     
            var sPath = "/ZR_MB_EMP_ODATA";        
            var oModel = this.getOwnerComponent().getModel();
            this.getView().setModel(oModel); // Set Model to View
            const oNewData = {
                Empid: "007",
                Empcomp: "Caleres",
                Empfname: "RJ",
                Emplname: "Bawa",
                Empage: "39",
                Empjdate: "2023-03-11T00:00:00",
                // Empjdate: "/Date(1676112000000)/",
                Empnum: "9832628613"
            }

            oModel.create("/ZR_MB_EMP_ODATA", oNewData, {
                success: function () {
                    sap.m.MessageToast.show("Record created successfully!");
                },
                error: function (oError) {
                    sap.m.MessageToast.show("Error creating record.");
                    if (oError.statusCode = '400') {
                        sPath = sPath + "('" + oNewData.Empid + "')";
                        oModel.remove(sPath, {
                            success: function() {
                                sap.m.MessageToast.show("Employee Deleted Successfully");
                            },
                            error: function(oError) {
                                console.error("Delete failed:", oError);
                            }
                        });
                    }                    
                }
            });
            
            var oSmartTable = this.getView().byId("smartTable"); // Get Smart Table
            oSmartTable.setModel(oModel); // Ensure Smart Table has the OData Model

            oModel.read("/ZMB_EMP_ODATA", {
                success: function(data) {
                    console.log(data)
                },
                error: function(error) {
                    console.error(error);
                }
            });

            var data = oModel.read("/ZMB_EMP_ODATA");
            var y = 1
        },
        onSearch: function () {
            const oSmartTable = this.byId("smartTable");
            const oTable = oSmartTable.getTable();
            const aFilters = [];

            // Get input values from FilterBar fields
            const sField1Value = this.byId("field1Input").getValue();
            const sField2Value = this.byId("field2Input").getValue();

            // Apply filters if values exist
            if (sField1Value) {
                aFilters.push(new Filter("Empid", FilterOperator.Contains, sField1Value));
            }
            if (sField2Value) {
                aFilters.push(new Filter("Empfname", FilterOperator.Contains, sField2Value));
            }

            if (oTable) {
                const oBinding = oTable.getBinding("items"); // Correct binding for tables
                if (oBinding) {
                    oBinding.filter(aFilters);
                }
            }
        },
        onCreatePress: function() {
          var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
          oRouter.navTo("CreateEmployee");  // Navigate to new page
        },
        onChange : function () {
            var oTable = this.getView().byId("smartTable").getTable(); // Get table reference
            var aSelectedItems = oTable.getSelectedIndices(); // Get selected rows

            // Enable the button only if at least one row is selected
            this.getView().byId("deleteButton").setEnabled(aSelectedItems.length > 0);
            this.getView().byId("updateButton").setEnabled(aSelectedItems.length > 0);
        },
        onDelete : function () {            
            var oModel = this.getOwnerComponent().getModel();
            var oTable = this.getView().byId("smartTable").getTable();
            var aSelectedItems = [];
            aSelectedItems = oTable.getSelectedIndices();            

            // Show confirmation dialog
            sap.m.MessageBox.confirm("Are you sure you want to delete this entry?", {
                actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                onClose: function(oAction) {
                    if (oAction === sap.m.MessageBox.Action.YES) {
                        // Delete the selected row
                        for ( let i = 0; i < aSelectedItems.length; i++) {
                            var sPath = "/ZR_MB_EMP_ODATA"; 
                            const element = aSelectedItems[i];
                            var val1 = oTable.getContextByIndex(element).getProperty("Empid");
                        
                            sPath = sPath + "('" + val1 + "')";
                            oModel.remove(sPath, {
                                success: function() {
                                sap.m.MessageToast.show("Record with Employee ID " + val1 + " deleted successfully.");
                                oModel.refresh();
                                },
                                error: function() {
                                sap.m.MessageToast.show("Error deleting Employee ID " + val1 );
                                }
                            });
                        }
                    }
                }
            });
        },
        onUpdate : function () {
            var oModel = this.getOwnerComponent().getModel();
            var oTable = this.getView().byId("smartTable").getTable();
            var aSelectedItems = [];
            aSelectedItems = oTable.getSelectedIndices();

            var oSmartTable = this.getView().byId("smartTable");
            oSmartTable.setEditable(true); // Make the table editable

            // var sPath = oTable.getContextByIndex(aSelectedItems[0]).getPath();
            // oRouter.navTo("UpdateEmployee", { path: encodeURIComponent(sPath) });
        }
    });
});