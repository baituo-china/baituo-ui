import { Children, isValidElement } from 'react';
export function toArrayChildren(children) {
    var ret = [];
    Children.forEach(children, function (child) {
        if (isValidElement(child)) {
            ret.push(child);
        }
    });
    return ret;
}
export function findChildInChildrenByKey(children, key) {
    if (children) {
        return children.find(function (child) {
            return child && child.key === key;
        });
    }
}
export function findShownChildInChildrenByKey(children, key, hiddenProp) {
    var ret = void 0;
    if (children) {
        children.forEach(function (child) {
            if (child && child.key === key && !child.props[hiddenProp]) {
                if (ret) {
                    throw new Error('two child with same key for animate children');
                }
                ret = child;
            }
        });
    }
    return ret;
}
// export function findHiddenChildInChildrenByKey(children, key, showProp):boolean {
//   let found = false;
//   if (children) {
//     children.forEach(function (child) {
//       if (found) {
//         return;
//       }
//       found = child && child.key === key && !child.props[showProp];
//     });
//   }
//   return found;
// }
export function isSameChildren(c1, c2, hiddenProp) {
    var same = c1.length === c2.length;
    if (same) {
        c1.forEach(function (child, index) {
            var child2 = c2[index];
            if (child && child2) {
                if (child && !child2 || !child && child2) {
                    same = false;
                } else if (child.key !== child2.key) {
                    same = false;
                } else if (hiddenProp && child.props[hiddenProp] !== child2.props[hiddenProp]) {
                    same = false;
                }
            }
        });
    }
    return same;
}
export function mergeChildren(prev, next) {
    var ret = [];
    var nextChildrenPending = {};
    var pendingChildren = [];
    prev.forEach(function (child) {
        if (child && child.key && findChildInChildrenByKey(next, child.key)) {
            if (pendingChildren.length) {
                nextChildrenPending[child.key] = pendingChildren;
                pendingChildren = [];
            }
        } else {
            pendingChildren.push(child);
        }
    });
    next.forEach(function (child) {
        if (child && child.key && nextChildrenPending.hasOwnProperty(child.key)) {
            ret = ret.concat(nextChildrenPending[child.key]);
        }
        ret.push(child);
    });
    return ret.concat(pendingChildren);
}