import { HashMap } from "../hashMap";

const createHash = () => {
  const hash = new HashMap();
  hash.set("apple", "red");
  hash.set("banana", "yellow");
  hash.set("carrot", "orange");
  hash.set("dog", "brown");
  hash.set("elephant", "gray");
  hash.set("frog", "green");
  hash.set("grape", "purple");
  hash.set("hat", "black");
  hash.set("ice cream", "white");
  hash.set("jacket", "blue");
  hash.set("kite", "pink");
  hash.set("lion", "golden");

  return hash;
};

test("Check resize capability", () => {
  const hash = createHash();

  expect(hash.length()).toBe(12);

  hash.set("moon", "silver");
  hash.set("wolf", "silver");
  hash.set("fox", "silver");

  expect(hash.length()).toBe(15);
});

test("Check hash clear method", () => {
  const hash = createHash();

  expect(hash.length()).toBe(12);
  hash.clear();
  expect(hash.length()).toBe(0);
});

test("Remove keys", () => {
  const hash = createHash();

  expect(hash.remove("frog")).toBe(true);
  expect(hash.remove("dog")).toBe(true);
  expect(hash.remove("froggy")).toBe(false);
  expect(hash.remove("doggy")).toBe(false);
  expect(hash.length()).toBe(10);
});

test("Remove keys after resizing", () => {
  const hash = createHash();

  hash.set("moon", "silver");
  hash.set("wolf", "silver");
  hash.set("fox", "silver");

  expect(hash.remove("frog")).toBe(true);
  expect(hash.remove("wolf")).toBe(true);
  expect(hash.remove("froggy")).toBe(false);
  expect(hash.remove("wolffy")).toBe(false);
  expect(hash.length()).toBe(13);
});

test("Get keys", () => {
  const hash = createHash();

  expect(hash.get("hat")).toBe("black");
  expect(hash.get("hatt")).toBe(null);
});
