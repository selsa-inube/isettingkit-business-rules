import { useState } from "react";
import {
  Checkbox,
  Date,
  IDateStatus,
  Text,
  Stack,
  useMediaQuery,
} from "@inubekit/inubekit";
import { ITerm } from "../../types/Forms/ITerm";

const Term = (props: ITerm) => {
  const {
    onHandleStartChange,
    onHandleEndChange,
    onCheckClosedChange,
    labelStart,
    labelEnd,
    checkedClosed = false,
    required = false,
    valueStart = "",
    valueEnd = "",
    messageStart = "",
    messageEnd = "",
    statusStart = "pending",
    statusEnd = "pending",
  } = props;

  const [checkClosed, setCheckClosed] = useState(checkedClosed),
    [start, setStart] = useState(valueStart),
    [end, setEnd] = useState(valueEnd);

  const onHandleCheck = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setCheckClosed(target.checked);
    if (onCheckClosedChange) {
      onCheckClosedChange(target.checked);
    }
  };

  const onStartChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStart(event.target.value);
    onHandleStartChange(event);
  };

  const onEndChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnd(event.target.value);
    onHandleEndChange(event);
  };

  const smallScreen = useMediaQuery("(max-width: 400px)");

  return (
    <Stack direction="column" width="100%" gap="20px">
      <Stack justifyContent="space-between">
        <Text appearance="dark" size="large" type="label">
          ¿La vigencia para este decisión es cerrada?
        </Text>

        <Checkbox
          label="Cerrada"
          onChange={onHandleCheck}
          checked={checkClosed}
          value={""}
        />
      </Stack>
      <Stack
        direction={smallScreen ? "column" : "row"}
        justifyContent="space-between"
        gap="24px"
      >
        <Date
          id="dateStart"
          label={labelStart}
          onChange={onStartChange}
          value={start as string}
          required={required}
          size="compact"
          status={statusStart as IDateStatus}
          message={messageStart}
          fullwidth
        />
        {checkClosed && (
          <Date
            id="dateEnd"
            label={labelEnd}
            onChange={onEndChange}
            value={end as string}
            required={required}
            size="compact"
            status={statusEnd as IDateStatus}
            message={messageEnd}
            fullwidth
          />
        )}
      </Stack>
    </Stack>
  );
};

export { Term };
