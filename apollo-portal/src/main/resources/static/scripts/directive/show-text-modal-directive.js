directive_module.directive('showtextmodal', showTextModalDirective);

function showTextModalDirective() {
    return {
        restrict: 'E',
        templateUrl: '../../views/component/show-text-modal.html',
        transclude: true,
        replace: true,
        scope: {
            text: '='
        },
        link: function (scope) {

        }
    }
}


