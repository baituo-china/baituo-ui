import _typeof from 'babel-runtime/helpers/typeof';
import { Children } from 'react';

export function getValuePropValue(child) {
  var props = child.props;
  if ('value' in props) {
    return props.value;
  }
  if (child.key) {
    return child.key;
  }
  if (child.type && child.type.isSelectOptGroup && props.label) {
    return props.label;
  }
  throw new Error('Need at least a key or a value or a label (only for OptGroup) for ' + child);
}

export function getPropValue(child, prop) {
  if (prop === 'value') {
    return getValuePropValue(child);
  }
  return child.props[prop];
}

export function isMultiple(props) {
  return props.multiple;
}

export function isTags(props) {
  return props.tags;
}

export function isCombobox(props) {
  return props.combobox;
}

export function isMultipleOrTags(props) {
  return props.multiple || props.tags;
}

export function isMultipleOrTagsOrCombobox(props) {
  return isMultipleOrTags(props) || isCombobox(props);
}

export function isSingleMode(props) {
  return !isMultipleOrTagsOrCombobox(props);
}

export function toArray(value) {
  var ret = value;
  if (value === undefined) {
    ret = [];
  } else if (!Array.isArray(value)) {
    ret = [value];
  }
  return ret;
}

export function getMapKey(value) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) + '-' + value;
}

export function preventDefaultEvent(e) {
  e.preventDefault();
}

export function findIndexInValueBySingleValue(value, singleValue) {
  var index = -1;
  for (var i = 0; i < value.length; i++) {
    if (value[i] === singleValue) {
      index = i;
      break;
    }
  }
  return index;
}

export function getLabelFromPropsValue(value, key) {
  var label = void 0;
  value = toArray(value);
  for (var i = 0; i < value.length; i++) {
    if (value[i].key === key) {
      label = value[i].label;
      break;
    }
  }
  return label;
}

export function getSelectKeys(menuItems, value) {
  if (value === null || value === undefined) {
    return [];
  }
  var selectedKeys = [];
  Children.forEach(menuItems, function (item) {
    if (item.type.isMenuItemGroup) {
      selectedKeys = selectedKeys.concat(getSelectKeys(item.props.children, value));
    } else {
      var itemValue = getValuePropValue(item);
      var itemKey = item.key;
      if (findIndexInValueBySingleValue(value, itemValue) !== -1 && itemKey) {
        selectedKeys.push(itemKey);
      }
    }
  });
  return selectedKeys;
}

export var UNSELECTABLE_STYLE = {
  userSelect: 'none',
  WebkitUserSelect: 'none'
};

export var UNSELECTABLE_ATTRIBUTE = {
  unselectable: 'unselectable'
};

export function findFirstMenuItem(children) {
  for (var i = 0; i < children.length; i++) {
    var child = children[i];
    if (child.type.isMenuItemGroup) {
      var found = findFirstMenuItem(child.props.children);
      if (found) {
        return found;
      }
    } else if (!child.props.disabled) {
      return child;
    }
  }
  return null;
}

export function includesSeparators(string, separators) {
  for (var i = 0; i < separators.length; ++i) {
    if (string.lastIndexOf(separators[i]) > 0) {
      return true;
    }
  }
  return false;
}

export function splitBySeparators(string, separators) {
  var reg = new RegExp('[' + separators.join() + ']');
  return string.split(reg).filter(function (token) {
    return token;
  });
}

export function defaultFilterFn(input, child) {
  if (child.props.disabled) {
    return false;
  }
  var value = toArray(getPropValue(child, this.props.optionFilterProp)).join('');
  return value.toLowerCase().indexOf(input.toLowerCase()) > -1;
}

export function validateOptionValue(value, props) {
  if (isSingleMode(props) || isMultiple(props)) {
    return;
  }
  if (typeof value !== 'string') {
    throw new Error('Invalid `value` of type `' + (typeof value === 'undefined' ? 'undefined' : _typeof(value)) + '` supplied to Option, ' + 'expected `string` when `tags/combobox` is `true`.');
  }
}

export function saveRef(instance, name) {
  return function (node) {
    instance[name] = node;
  };
}