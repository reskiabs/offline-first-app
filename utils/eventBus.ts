type Callback = () => void;

const listeners: Callback[] = [];

export const subscribe = (cb: Callback) => {
  listeners.push(cb);
};

export const emit = () => {
  listeners.forEach((cb) => cb());
};
