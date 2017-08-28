var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { connect } from 'react-redux';
import * as React from 'react';
var appConnector = function () { return function (mstp, mdtp //    MapDispatchToPropsParam<TPropsFromDispatch,TOwnProps> //| TPropsFromDispatch
) {
    return {
        connect: function (compo) {
            return connect(mstp, mdtp)(compo); //as any as InferableComponentEnhancerWithProps<TPropsFromState & TPropsFromDispatch, TOwnProps> 
        },
        StatefulCompo: (function (_super) {
            __extends(StatefulCompo, _super);
            function StatefulCompo() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return StatefulCompo;
        }(React.Component)),
        StatelessCompo: function (compo) { return compo; }
    };
}; };
export { appConnector };
//# sourceMappingURL=appConnector.js.map