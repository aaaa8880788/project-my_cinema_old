// function getProperty<T, K extends keyof T>(obj: T, key: K) {
//   return obj[key];
// }
type Controll = (...args: any[]) => void;

class PubSub {
  listener = new Map<string, Set<Controll>>();

  addListener(name: string, controll: Controll) {
    const { listener } = this;
    const controlls = listener.has(name)
      ? listener.get(name)!
      : new Set<Controll>();
    controlls.add(controll);
    listener.set(name, controlls);
  }

  publish(name: string, ...args: any[]) {
    const { listener } = this;
    if (!listener.has(name)) throw new Error(`事件 ${name} 未订阅!!!`);
    listener.get(name)!.forEach((controll) => controll(...args));
  }

  off(name: string, controll?: Controll) {
    const { listener } = this;
    if (listener.has(name)) throw new Error(`事件 ${name} 未订阅!!!`);
    const controlls = listener.get(name)!;
    controll ? controlls.delete(controll) : controlls.clear();
  }
}

const pubSub = new PubSub();
const nextTick = (controll: Controll) => {
  pubSub.addListener("nextTick", controll);
};

nextTick(() => {
  console.log("模拟nextTick");
});
nextTick(() => {
  console.log("模拟nextTick");
});
