var PubSub = /** @class */ (function () {
    function PubSub() {
        this.listener = new Map();
    }
    PubSub.prototype.addListener = function (name, controll) {
        var listener = this.listener;
        var controlls = listener.has(name)
            ? listener.get(name)
            : new Set();
        controlls === null || controlls === void 0 ? void 0 : controlls.add(controll);
        listener.set(name, controlls);
    };
    PubSub.prototype.publish = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var listener = this.listener;
        if (!listener.has(name))
            throw new Error("\u4E8B\u4EF6 ".concat(name, " \u672A\u8BA2\u9605!!!"));
        listener.get(name).forEach(function (controll) { return controll.apply(void 0, args); });
    };
    PubSub.prototype.off = function (name, controll) {
        var listener = this.listener;
        if (listener.has(name))
            throw new Error("\u4E8B\u4EF6 ".concat(name, " \u672A\u8BA2\u9605!!!"));
        var controlls = listener.get(name);
        controll ? controlls["delete"](controll) : controlls.clear();
    };
    return PubSub;
}());
var pubSub = new PubSub();
var nextTick = function (controll) {
    pubSub.addListener("nextTick", controll);
};
nextTick(function () {
    console.log("模拟nextTick");
});
nextTick(function () {
    console.log("模拟nextTick");
});
setTimeout(function () {
    pubSub.publish("nextTick");
}, 2000);
