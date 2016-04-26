appUtil.service('AppUtil', [function () {
    
    return {
        errorMsg: function (response) {
            var msg =  "Code:" + response.status;
            if (response.data.message != null){
                msg += " Msg:" + response.data.message;
            }
            return msg;
        }
    }
}]);
