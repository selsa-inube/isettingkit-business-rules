import { useState } from "react";
import { Checkpicker, ICheckpicker } from "..";

const CheckpickerController = (props: ICheckpicker) => {
  const { name, values, options } = props;
  const [form, setForm] = useState({ [name]: values });

  const onChange = (name: string, newValue: string) => {
    setForm({ ...form, [name]: newValue });
  };

  return (
    <Checkpicker
      {...props}
      name={name}
      values={form[name]}
      options={options}
      onChange={onChange}
    />
  );
};

export { CheckpickerController };
