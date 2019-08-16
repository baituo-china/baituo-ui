# Baituo UI

An enterprise-class UI design language and React-based implementation.

[中文 README](README-zh_CN.md)

## Features

- Extracted from the interactive language and visual style of enterprise-level medium and backstage products.
- A set of high-quality React components out of the box.
- Written in TypeScript with predictable static types.
- The whole package of development and design resources and tools.

## Environment Support

* Modern browsers and Internet Explorer 9+ (with [polyfills](https://ant.design/docs/react/getting-started#Compatibility))
* Server-side Rendering
* [Electron](http://electron.atom.io/)

## 本地 Install

```bash
npm install /opt/git/baituo-ui --save
```

## Usage

```jsx
import { DatePicker } from 'baituo-ui';
import { Button } from 'baituo-ui';
import 'baituo-ui/dist/baituo-ui.min.css';

// ReactDOM.render(<DatePicker />, mountNode);

ReactDOM.render(
  <div>
    <Button funcType="raised">Rasied</Button>
    <Button funcType="flat">Flat</Button>
    <Button shape="circle" funcType="flat" icon="search" />
    <Button type="primary" funcType="raised" shape="circle" icon="search" />
    <Button type="primary" funcType="raised" icon="search">Search</Button>
    <Button type="primary" funcType="flat" shape="circle" icon="search" />
    <Button type="primary" funcType="flat" icon="search">Search</Button>
  </div>,
  document.getElementById('root'));
  
```

And import style manually:

```jsx
import 'baituo-ui/dist/baituo-ui.css';  // or 'baituo-ui/dist/baituo-ui.less'
```

Or [import components on demand](http://ant-design.gitee.io/docs/react/getting-started#Import-on-Demand)

### TypeScript

See [Used in TypeScript](http://ant-design.gitee.io/docs/react/use-in-typescript)


## Internationalization

See [i18n](http://ant-design.gitee.io/docs/react/i18n).

## Links

- [Home page](https://baituo.github.io/baituo-ui/index-cn/)
- [Components](https://baituo.github.io/baituo-ui/docs/react/introduce)
- [Change Log](CHANGELOG.en-US.md)
- [Scaffold Market](http://scaffold.ant.design)
- [Ant Design](http://ant-design.gitee.io)
- [rc-components](http://react-component.github.io/)
- [Customize Theme](https://baituo.github.io/baituo-ui/customize-theme)

Open your browser and visit http://127.0.0.1:8001 , see more at https://github.com/ant-design/ant-design/wiki/Development .
