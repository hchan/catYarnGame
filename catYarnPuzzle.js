var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MyComponent = (function (_super) {
    __extends(MyComponent, _super);
    function MyComponent() {
        return _super.apply(this, arguments) || this;
    }
    MyComponent.prototype.render = function () {
        return React.createElement("span", null, this.props.foo);
    };
    return MyComponent;
}(React.Component));
React.createElement(MyComponent, { foo: "bar" });
//# sourceMappingURL=catYarnPuzzle.js.map