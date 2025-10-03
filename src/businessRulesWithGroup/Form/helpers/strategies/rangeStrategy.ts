import { number, object } from "yup";

const rangeStrategy = (value: { from?: number; to?: number }) => {
  const fromNumber = value?.from ?? 0;
  const toNumber = value?.to ?? 0;

  return {
    schema: object({
      from: number()
        .required("El campo 'Rango desde' es requerido")
        .max(toNumber, `'Rango desde' no puede ser mayor que 'Rango hasta'`)
        .min(0, `'Rango desde' no puede ser menor que 0`),
      to: number()
        .min(0, "El campo 'Rango hasta' debe ser mayor o igual a 0")
        .required("El campo 'Rango hasta' es requerido")
        .test(
          "is-greater",
          "El campo 'Rango hasta' debe ser mayor que 'Rango desde'",
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
