import { useState } from "react";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Date } from "@inubekit/date";
import { Checkbox } from "@inubekit/checkbox";

interface ITermProps {
  onHandleStartChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onHandleEndChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  labelStart: string;
  labelEnd: string;
  checkedClosed?: boolean;
  required?: boolean;
  valueStart?: string;
  valueEnd?: string;
}

const Term = (props: ITermProps) => {
  const {
    onHandleStartChange,
    onHandleEndChange,
    labelStart,
    labelEnd,
    checkedClosed = false,
    required = false,
    valueStart = "",
    valueEnd = "",
  } = props;

  const [checkClosed, setCheckClosed] = useState(checkedClosed),
    [start, setStart] = useState(valueStart),
    [end, setEnd] = useState(valueEnd);

  const onHandleCheck = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setCheckClosed(target.checked);
  };

  const onStartChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStart(event.target.value);
    onHandleStartChange(event);
  };

  const onEndChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnd(event.target.value);
    onHandleEndChange(event);
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" margin="10px 0">
        <Stack>
          <Text
            appearance="gray"
            margin="10px 0"
            size="medium"
            type="title"
            weight="bold"
          >
            Vigencia
          </Text>
        </Stack>
        <Stack
          alignContent="center"
          justifyContent="center"
          wrap="wrap"
          gap="4px"
        >
          <Checkbox
            label="Cerrada"
            onChange={onHandleCheck}
            checked={checkClosed}
            value={""}
          />
        </Stack>
      </Stack>
      <Stack justifyContent="space-between" gap="24px">
        <Stack width="189px">
          <Date
            id="dateStart"
            label={labelStart}
            onChange={onStartChange}
            value={start}
            required={required}
            size="compact"
          />
        </Stack>
        {checkClosed && (
          <Stack width="189px">
            <Date
              id="dateEnd"
              label={labelEnd}
              onChange={onEndChange}
              value={end}
              required={required}
              size="compact"
            />
          </Stack>
        )}
      </Stack>
    </>
  );
};

export { Term };
export type { ITermProps };
