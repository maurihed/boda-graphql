function chisme(target, name, descriptor) {
  console.log({target, name});
  const original = descriptor.value;
  if (typeof original === 'function') {
    descriptor.value = function(...args) {
      console.log(`Este usuario anda salidando a: ${args}`);
      try {
        const result = original.apply(this, args);
        console.log(`Le dijo : ${result} OMG!`);
        return result;
      } catch (e) {
        console.log(`Error: ${e}`);
        throw e;
      }
    }
  }
  return descriptor;
}

class Calle {
  @chisme()
  sayHello(name) {
    return `Hello ${name}`;
  }
}

const calle = new Calle();
console.log(calle.sayHello());