import _extends from 'babel-runtime/helpers/extends';
export function getPlacementStyle(placement, defaultTop, defaultBottom) {
    var top = defaultTop ? defaultTop + 'px' : 0;
    var bottom = defaultBottom ? defaultBottom + 'px' : 0;
    var target = {
        left: '24px',
        right: '24px',
        top: top,
        bottom: bottom
    };
    var style = {};
    switch (placement) {
        case 'top':
            style = {
                bottom: 'auto'
            };
            break;
        case 'right':
            style = {
                left: 'auto',
                top: '50%',
                bottom: 'auto'
            };
            break;
        case 'bottom':
            style = {
                top: 'auto'
            };
            break;
        case 'left':
            style = {
                right: 'auto',
                top: '50%',
                bottom: 'auto'
            };
            break;
        case 'topLeft':
        case 'leftTop':
            style = {
                right: 'auto',
                bottom: 'auto'
            };
            break;
        case 'topRight':
        case 'rightTop':
            style = {
                left: 'auto',
                bottom: 'auto'
            };
            break;
        case 'bottomLeft':
        case 'leftBottom':
            style = {
                right: 'auto',
                top: 'auto'
            };
            break;
        case 'bottomRight':
        case 'rightBottom':
            style = {
                left: 'auto',
                top: 'auto'
            };
            break;
        default:
            break;
    }
    _extends(target, style);
    return target;
}
export function getPlacementTransitionName(placement, defaultTransitionName) {
    var transitionName = defaultTransitionName;
    switch (placement) {
        case 'top':
        case 'topLeft':
        case 'topRight':
            transitionName = 'move-up';
            break;
        case 'left':
        case 'leftTop':
        case 'leftBottom':
            transitionName = 'move-left';
            break;
        case 'bottom':
        case 'bottomLeft':
        case 'bottomRight':
            transitionName = 'move-down';
            break;
        case 'right':
        case 'rightTop':
        case 'rightBottom':
            transitionName = 'move-right';
            break;
        default:
            break;
    }
    return transitionName;
}