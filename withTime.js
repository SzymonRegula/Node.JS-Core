import EventEmitter from "./eventEmitter.js";

export default class WithTime extends EventEmitter {
  async execute(asyncFunc, ...args) {
    this.emit("start");
    const start = process.hrtime.bigint();
    const data = await asyncFunc(...args);
    const end = process.hrtime.bigint();
    const time = end - start;
    this.emit("end", time);
    this.emit("data", data);
  }
}

const fetchFromUrl = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const runTest = () => {
  const withTime = new WithTime();

  withTime.on("start", () => console.log("About to execute"));
  withTime.on("end", (time) =>
    console.log(`Done with execute, time: ${time} ns`)
  );
  withTime.on("data", (data) => console.log("Data received:", data));

  withTime.execute(
    fetchFromUrl,
    "https://jsonplaceholder.typicode.com/posts/1"
  );

  console.log(withTime.rawListeners("end"));
};
// runTest();
