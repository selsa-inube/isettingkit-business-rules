import { useState } from "react";
import { Stack, useMediaQuery } from "@inubekit/inubekit";
import { Text } from "@inubekit/inubekit";
import { Date, IDateStatus } from "@inubekit/inubekit";
import { Checkbox } from "@inubekit/inubekit";

interface ITermProps {
  onHandleStartChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onHandleEndChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckClosedChange?: (isClosed: boolean) => void;
  labelStart: string;
  labelEnd: string;
  checkedClosed?: boolean;
  required?: boolean;
  valueStart?: string | Date;
  valueEnd?: string | Date;
  messageStart?: string;
  messageEnd?: string;
  statusStart?: string;
  statusEnd?: string;
}

const Term = (props: ITermProps) => {
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
    <>
      <Stack direction="row" justifyContent="space-between" margin="10px 0">
        <Text
          appearance="gray"
          margin="10px 0"
          size="medium"
          type="title"
          weight="bold"
        >
          Vigencia
        </Text>
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
          />
        )}
      </Stack>
    </>
  );
};

export { Term };
export type { ITermProps };
