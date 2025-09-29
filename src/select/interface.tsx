import { forwardRef, useContext, useMemo } from "react";

import { MdOutlineChevronRight, MdOutlineError } from "react-icons/md";

import { OptionList } from "./OptionList";

import {
  StyledContainer,
  StyledInput,
  StyledInputContainer,
  StyledChevron,
  StyledContainerLabel,
} from "./styles";

import { ThemeContext } from "styled-components";
import { tokens as InputTokens } from "./tokens";
import {
  Icon,
  IOption,
  ISelect,
  ISelectSize,
  ITextAppearance,
  Label,
  OptionItem,
  Stack,
  Tag,
  Text,
} from "@inubekit/inubekit";

interface IMessage {
  message: ISelect["message"];
}

interface ISelectInterface extends ISelect {
  displayList: boolean;
  focused?: boolean;
  maxItems: number;
  showChevron: boolean;
  editable?: boolean;
  checkedItems: string[];
  clearable: boolean;
  handleClear: () => void;
  onOptionClick: (value: string) => void;
  onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const getTypo = (size: ISelectSize) => {
  if (size === "compact") {
    return "medium";
  }
  return "large";
};

function getOptionLabel(options: IOption[], value: string) {
  const option = options.find((option) => option.value === value);
  if (option) {
    return option.label;
  }
  return value;
}

const Message = (props: IMessage) => {
  const { message } = props;
  const theme = useContext(ThemeContext) as { input: typeof InputTokens };
  const messageAppearance =
    (theme?.input?.message?.appearance as ITextAppearance) ||
    InputTokens.message.appearance;

  return (
    <Stack alignItems="center" gap="4px" margin="4px 0 0 16px">
      <Icon
        appearance={messageAppearance}
        icon={<MdOutlineError />}
        size="14px"
      />
      <Text
        type="body"
        size="small"
        appearance={messageAppearance}
        textAlign="start"
      >
        {message}
      </Text>
    </Stack>
  );
};

const SelectUI = forwardRef((props: ISelectInterface, ref) => {
  const {
    displayList,
    disabled,
    focused,
    fullwidth,
    id,
    invalid,
    label,
    maxItems,
    message,
    name,
    options,
    placeholder,
    required,
    size,
    value,
    picker,
    showChevron,
    checkedItems,
    editable = false,
    clearable,
    onKeyUp,
    onBlur,
    onChange,
    onClick,
    onFocus,
    onOptionClick,
    onCheckboxChange,
    handleClear,
  } = props;

  const theme = useContext(ThemeContext) as { input: typeof InputTokens };
  const requiredAppearance =
    (theme?.input?.required?.appearance as ITextAppearance) ||
    InputTokens.required.appearance;

  const showRequired = required && !disabled;
  const displayValue = picker
    ? ""
    : value === ""
      ? ""
      : getOptionLabel(options, value);

  const selectedOptions = useMemo(
    () => options.filter((o) => checkedItems.includes(o.id)),
    [options, checkedItems],
  );

  const handleRemoveTag = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const fakeEvt = {
      target: { checked: false, value: id },
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    onCheckboxChange(fakeEvt);
  };
  return (
    <StyledContainer $fullwidth={fullwidth} $disabled={disabled} ref={ref}>
      {label && (
        <StyledContainerLabel
          $alignItems="center"
          $disabled={disabled}
          $wrap="wrap"
        >
          <Label
            htmlFor={id!}
            focused={focused}
            invalid={invalid}
            margin="0px 0px 0px 16px"
            size={getTypo(size!)}
            disabled={disabled}
          >
            {label}
          </Label>

          {showRequired && (
            <Text appearance={requiredAppearance} size="small" type="body">
              (Requerido)
            </Text>
          )}
        </StyledContainerLabel>
      )}
      <StyledInputContainer
        $disabled={disabled}
        $focused={focused}
        $invalid={invalid}
        onClick={!editable ? onClick : undefined}
        $value={value}
        $size={size}
      >
        <StyledInput
          $inputWithData={!!value}
          autoComplete="off"
          value={displayValue}
          name={name}
          id={id}
          placeholder={placeholder}
          $disabled={disabled}
          required={required}
          $size={size}
          $fullwidth={fullwidth}
          $focused={focused}
          readOnly={!editable}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange(name, e.target.value)
          }
          onClick={editable ? onClick : undefined}
          onKeyUp={onKeyUp}
        />
        <Stack
          direction="row"
          gap="8px"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack gap="8px" alignItems="center" wrap="wrap">
            {clearable &&
              !disabled &&
              (picker
                ? selectedOptions.map((opt) => (
                    <Tag
                      key={opt.id}
                      appearance="gray"
                      label={opt.label}
                      removable
                      displayIcon={false}
                      onClose={(e) => handleRemoveTag(e, opt.id)}
                    />
                  ))
                : (value ?? "") !== "" && (
                    <Tag
                      appearance="gray"
                      label={getOptionLabel(options, value)}
                      removable
                      displayIcon={false}
                      onClose={(e) => {
                        e.stopPropagation();
                        handleClear();
                      }}
                    />
                  ))}
          </Stack>

          {showChevron && (
            <StyledChevron $displayList={displayList}>
              <Icon
                appearance="dark"
                icon={<MdOutlineChevronRight />}
                spacing="narrow"
                disabled={disabled}
              />
            </StyledChevron>
          )}
        </Stack>
      </StyledInputContainer>

      {invalid && <Message message={message} />}
      {displayList && !disabled && (
        <OptionList
          maxItems={maxItems}
          onOptionClick={onOptionClick}
          options={options}
        >
          {options.map((optionItem) => (
            <OptionItem
              key={optionItem.id}
              id={optionItem.id}
              label={optionItem.label}
              checked={checkedItems.includes(optionItem.id)}
              onCheckboxChange={onCheckboxChange}
              picker={picker}
            />
          ))}
        </OptionList>
      )}
    </StyledContainer>
  );
});

export { SelectUI };
export type { ISelectInterface };
