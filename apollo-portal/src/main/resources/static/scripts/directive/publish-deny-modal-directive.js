directive_module.directive('publishdenymodal', publishDenyDirective);

function publishDenyDirective(AppUtil, EventManager) {
    return {
        restrict: 'E',
        templateUrl: '../../views/component/publish-deny-modal.html',
        transclude: true,
        replace: true,
        scope: {
        },
        link: function (scope) {
            var MODAL_ID = "#publishDenyModal";

            EventManager.subscribe(EventManager.EventType.PUBLISH_DENY, function (context) {
                scope.toReleaseNamespace = context.namespace;
                scope.mergeAndPublish = !!context.mergeAndPublish;
                AppUtil.showModal(MODAL_ID);
            });

            scope.emergencyPublish = emergencyPublish;

            function emergencyPublish() {
                AppUtil.hideModal(MODAL_ID);
                
                if (scope.mergeAndPublish) {
                    EventManager.emit(EventManager.EventType.MERGE_AND_PUBLISH_NAMESPACE,
                                      {
                                          branch: scope.toReleaseNamespace,
                                          isEmergencyPublish: true
                                      });
                } else {
                    EventManager.emit(EventManager.EventType.PUBLISH_NAMESPACE,
                                      {
                                          namespace: scope.toReleaseNamespace,
                                          isEmergencyPublish: true
                                      });
                }

            }
        }
    }
}


