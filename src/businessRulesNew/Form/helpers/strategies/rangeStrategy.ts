import { number, object } from "yup";

const rangeStrategy = (value: { from?: number; to?: number }) => {
  const fromNumber = value?.from ?? 0;
  const toNumber = value?.to ?? 0;

  return {
    schema: object({
      from: number()
        .required("El campo de tipo rango es requerido")
        .max(toNumber, `El rango desde no puede ser mayor al rango hasta`)
        .min(0, `El rango desde no puede ser menor a 0`),
      to: number()
        .min(0, "El rengo hasta debe ser mayor o igual a 0")
        .required("El rango hasta es requerido")
        .test(
          "is-greater",
          "El rengo hasta debe ser mayor a el rango desde",
          function (to) {
            const { from } = this.parent;
            return to > from;
          },
        ),
    }),
    value: { from: fromNumber, to: toNumber },
  };
};

export { rangeStrategy };
