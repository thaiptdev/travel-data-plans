export type RouterParams = {
  "/": undefined;
  "/cart": undefined;
  "/plan/[id]": { id: string };
  "/checkout": undefined;
  "/confirmation": { orderData: any };
};
