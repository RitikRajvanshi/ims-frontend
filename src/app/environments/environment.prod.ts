export const environment = {
    production: true,
    BASE_URL: 'http://localhost4200:3009/',  //URL
    ADMIN_URL: 'http://localhost4200:3009/',
    USER_URL: 'http://localhost4200:3009/',


    SHARED: {
        GET_SUPPLIER_DATA: 'getSupplierdata',   //shared me daalna hai
        GET_SUPPLIER_DATA_BYID: 'getSupplierdatabyid',
        GETUSERSDATABYSTATUS: 'getUsersdatabystatus',
        GETUSERSDATABYID: 'getUsersdatabyid',
        GETPRODUCTDATA: 'getproductdetail',
        GETPENDINGREQUEST: 'getPendingrequest',
        GETPENDINGIREQUESTBYID: 'getPendingrequestbyId',

        GETREJECTEDREQUEST: 'getRejectedrequest',
        GETACCEPTEDREQUEST: 'getAcceptedrequest',
        GETPURCHASEJOINDATA: 'getpurchasejoindata',
        GETPURCHASEJOINDATABYIDORPURCHASEID: 'getpurchasejoindatabyIdorpurchaseid',
        GETPURCHASEDATAFROMPURCHASEORDER: 'getpurchasedatafrompo',
        GET_SUPPLIERDATABY_NAME: 'getSupplierdatabyname',
        GETLASTPURCHASEID: 'getLastPurchaseId',
        GETPURCHASEORDERDATABYPID: 'getpurchaseorderdatabypid',

        GETPURCHASEORDERDATA: 'getpurchaseorderData',
        GETPURCHASEDATAFORINVOICE:'getpurchasedatafrompoforinvoice',
        GETPURCHASEDATAFROMPOACCTOINVOICE: 'getpurchasedatafrompoacctoinvoice',
        GETPURCHASEDATABYID: 'getpurchasedatabyid',
        GETPURCHASEJOINDATABYPID: 'getpurchasejoindatabypid',
        GETPURCHASEJOINDATABYID:'getpurchasejoindataby_id',
        GETLASTITEMCODEFROMITEM: 'getlastItemCode',
        GETSUPPLIERJOINDATAFROMPO: 'getSupplierjoindatafrompo',
        GETSUPPLIEREVALUATIONDATABYPID: 'getsupplierEvaluationdatabyPid',
        GETSUPPLIEREVALUATIONBYSUPPLIERID: 'getsupplierEvaluationdatabysupplierId',
        GETITEMSDATA: 'getItemsData',
        GETCATEGORYDATA: 'getcategorydetail',
        GETDOCUMENTDATA: 'getDocumentdata',
        GETDOCUMENTDATABYDOCUMENTID: 'getDocumentdatabydocId',

        //Quotation
        GETQUOTATIONDATA: 'getQuotationdata',
        GETQUOTATIONDATABYID: 'getQuotationdatabyId',
        GETVENDOREVALUATIONJOINDATA: 'getvendorEvaluationjoindata',

        

        //filters and sorting
        GETPURCHASEJOINDATABYDATE: 'getpurchasejoinDatabydate',
        GET_SUPPLIERDATA_BYDATEFILTER: 'getSupplierdatabybydatefilter',
        GETPURCHASEORDERDATABYDATE: 'getpurchaseorderDatabydate',
        GETSENDPURCHASEORDERDATA: 'getsendpurchaseorderData',
        GETCOUNTOFRECEIVEDORDER: 'getcountofreceivedpurchaseorder',
        GETCOUNTOFRECEIVEDREQUEST: 'getcountofreceivedrequest',                         //PENDING REQUEST COUNT

        GETCOUNTOFPURCHASEORDERS:'getcountofPurchaseOrders',
        GETPURCHASEDATACCEPTORREJECT: 'getpurchasedataacceptorreject',
        GETSUMOFPURCHASEORDERSBYDATE: 'getSumofpurchaseordersbyDate',
        GETCOUNTOFITEMSBYDATE: 'getcountofItemsbyDate',

        GETREPORTITEMWITHPRICE: 'getreportItemwithPrice',
        GETREPORTPENDINGSTOCK: 'getreportpendingStock',
        GETREPORTSTOCKINHAND: 'getreportStockinhand',
        GETFULLASSETBYDATE: 'getfullassetbyDate',
        GETTOTALPRICEANDITEMSFROMPI: 'gettotalpriceanditemsfrompi',
        GETCOMPANYDATA: 'getcompanyData',
        GETCOMPANYDATABYCOMPANYNAME: 'getcompanyDatabycompanyName',

        GETPRODUCTDATAJOINBYSTATUS: 'getProductDatajoinbystatus',
        GETSYSTEMDATAFROMITEMS:'getSystemdatafromitems',
        GETITEMSOTHERTHANCPU:'getItemsotherthanCPU',
        GETSYSTEMDATABYITEMID:'getsystemDatabyitemId',
        GETSYSTEMDATAOTHERTHANCPU:'getsystemDataotherThanCPU',
        GETSYSTEMCONFIG:'getSystemConfiguration',
        GETSYSTEMDATAFROMTRANSFERSTOCK:'getSystemDataFromtransferStock',

        

    },

    ADMIN: {
        ADD_CATEGORY: 'addCategory',
        UPDATE_CATEGORY: 'updatecategory',
        ADD_GROUP: 'addGroup',
        UPDATEGRP: 'updateGrpdata',
        ADD_DESIGNATION: 'addDesignation',
        UPDATEDESIGNATION: 'updateDesignationdata',
        ADD_PRIVILEGE: 'addPrivilege',
        UPDATEPRIVILEGE: 'updatePrivilegedata',
        ADD_LOCATION: 'addlocation',
        UPDATE_LOCATION: 'updatelocation',
        ADD_PRODUCT: 'addProducts',
        UPDATE_PRODUCT: 'updateproduct',

        ADD_SUPPLIER: 'addSupplier',
        // GET_SUPPLIER_DATA:'getSupplierdata',

        UPDATE_SUPPLIER: 'updatesupplier',
        DELETE_SUPPLIER_DATA: 'deleteSupplierdata',

        ADD_USER: 'addUser',
        DEACTIVATEUSERSTATUSBYID: 'deactivateuserstatusbyid',       //deleting user temporary status =0
        UPDATEUSER: 'updateUser',
        GENERATEREQUEST: 'generateRequest',
        MAKEPRUCHASEORDER: 'makePurchaseOrder',
        UPDATESENTINPURCHASEORDER: 'updateSentinpurchaseOrder',
        UPDATESENTAPPROVEDPURCHASEORDER: 'updatesentApprovedpurchaseorder',
        UPDATESENTREJECTPURCHASEORDER: 'updatesentRejectpurchaseorder',

        ADDINSPECTIONINPI: 'addInspectionapprovalinpi',

        ADDITEM: 'addItems',
        ADDSUPPLIEREVALUATION: 'supplierEvaluation',
        UPDATEITEM: 'updateItem',

        // GENERATEREQUEST:'generateRequest',
        UPDATEREQUESTGRANTEDQUANTITY: 'updaterequestgrantedQuantity',
        COMPANYREGISTRATION: 'companyRegisteration',
        TRANSFERSTOCK:'transferStock',

        UPDATEISACTIVEINPIFORITEMS:'updateIsActiveinpi'
    },

    CHECK: {
        GETCATEGORYBYSTATUS: 'getcategorytDatabystatus',
        DEACTIVATECATEGORYSTATUSCHECK: 'deactivateCategorystatuscheck',
        GETGROUPDATABYSTATUS: 'getgroupDatabystatus',
        DEACTIVATEGROUPSTATUSBYCHECK: 'deactivateGroupstatuscheck',
        GETDESIGNATIONBYSTATUS: 'getdesignationDatabystatus',
        DEACTIVATEDESIGNATIONSTATUSBYCHECK: 'deactivateDesingationstatuscheck',
        GETPRIVILEGEBYSTATUS: 'getprivilegeDatabystatus',
        DEACTIVATEPRIVILEGESTATSUCHECK: 'deactivatePrivilegestatuscheck',
        GETLOCATIONDATABYSTATUS: 'getLocationbystatus',
        DEACTIVATELOCATIONDATABYID: 'deactivateLocationstatusbyid',
        GETPRODUCTBYSTATUS: 'getproductDatabystatus',
        // GETPRODUCTJOINDATABYSTATUS:'getproductjoinDatabystatus',
        DEACTIVATEPRODUCTSTATUSCHECK: 'deactivateproductstatuscheck',
        GETUSERSDATABYID: 'getUsersdatabyid',
        VERIFICATIONOFPIDINSUPPLIEREVALUATION: 'verificationofpIdinsupplierEvaluation',
        CHANGESTATUSONACCEPTREQ: 'onacceptrequest',
        CHANGESTATUSONREJECTREQ: 'onrejectrequest',
        VERIFICATIONOFITEMS: 'verificationofItems'

    },
    FILES: {

        UPLOADFILEANDGETDATA: 'uploadInvoicefileandgetdata',
        UPLOADINVOICEINPO: 'uploadInvoicedatainpo',
        UPDATEINVOICENOINPO: 'updateInvoicenoinpo',
        UPLOADSCANDOCUMENT: 'uploadDocumentData',
        UPDATEDOCOTHERTHANFILE: 'updateDocotherthanfile',
        UPDATEFULLDOCUMENT: 'updateFullDocument',
        UPLOADQUOTATION: 'uploadQuotation',
        UPDATEQUOTATIONOTHERTHANFILE: 'updateQuotationotherthanfile',
        UPDATEFULLQUOTATION: 'updateFullQuotation'


    },

    LOGIN: {

        LOGIN_CUSTOMER: 'login', 
        //end-point
    }
};
