import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { SelectUI } from "./interface";
import { ISelectSize } from "@inubekit/inubekit";

interface IOption {
  id: string;
  label: string;
  value: string;
}

interface ISelect {
  disabled?: boolean;
  fullwidth?: boolean;
  id?: string;
  invalid?: boolean;
  label?: string;
  maxItems?: number;
  message?: string;
  name: string;
  onBlur?: (event: FocusEvent) => void;
  onChange: (name: string, value: string) => void;
  onClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  options: IOption[];
  placeholder?: string;
  required?: boolean;
  size?: ISelectSize;
  value: string;
  showOptions?: boolean;
  picker?: boolean;
  showChevron?: boolean;
  editable?: boolean;
  clearable?: boolean;
}

const Select = (props: ISelect) => {
  const {
    disabled = false,
    fullwidth = false,
    id,
    invalid = false,
    label,
    maxItems = 5,
    message,
    name,
    onBlur,
    onChange,
    onClick,
    onFocus,
    onKeyUp,
    options,
    placeholder,
    required = false,
    size = "wide",
    value,
    showOptions = false,
    picker = false,
    showChevron = true,
    editable = false,
    clearable = true,
  } = props;

  const [displayList, setDisplayList] = useState(false);
  const [focused, setFocused] = useState(false);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const selectRef = useRef<{ contains: (e: EventTarget) => EventTarget }>(null);

  useEffect(() => {
    if (picker) {
      const items = value ? value.split(",").map((item) => item.trim()) : [];
      setCheckedItems(items);
    }
  }, [value, picker]);

  function handleClear() {
    onChange(name, "");
    setCheckedItems([]);
    setDisplayList(false);
  }

  function handleClick(event: React.ChangeEvent<HTMLInputElement>) {
    if (disabled) return;

    setDisplayList(!displayList);

    try {
      onClick && onClick(event);
    } catch (error) {
      console.error(`Error when clicking over select. ${error}`);
    }
  }

  const handleDocumentClick = useCallback((event: MouseEvent) => {
    if (
      selectRef.current &&
      event.target &&
      !selectRef.current.contains(event.target)
    ) {
      setDisplayList(false);
    }
  }, []);

  function handleFocusAndBlur(event: FocusEvent) {
    try {
      if (event.type === "focus") {
        setFocused(true);
        onFocus && onFocus(event);
      }

      if (event.type === "blur") {
        setFocused(false);
        onBlur && onBlur(event);
      }
    } catch (error) {
      console.error(`Error executing focus/blur callback. ${error}`);
    }
  }

  function handleOptionClick(value: string) {
    setDisplayList(false);
    try {
      onChange && onChange(name, value);
    } catch (error) {
      console.error(`Error when changing value using callback. ${error}`);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setDisplayList(false);
    }
    setDisplayList(!displayList);
    try {
      onKeyUp && onKeyUp(event);
    } catch (error) {
      console.error(`Error when clicking over select. ${error}`);
    }
  }

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, checked } = event.target;
    setCheckedItems((prevChecked) => {
      const newChecked = checked
        ? [...prevChecked, value]
        : prevChecked.filter((item) => item !== value);
      onChange(name, newChecked.join(","));
      return newChecked;
    });
  }

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [handleDocumentClick]);

  const processedOptions = useMemo(() => {
    if (clearable || picker) return options;

    return [{ id: "empty-option", label: "", value: "" }, ...options];
  }, [options, clearable, picker]);

  return (
    <SelectUI
      ref={selectRef}
      disabled={disabled}
      displayList={displayList ? displayList : showOptions}
      focused={focused}
      fullwidth={fullwidth}
      id={id}
      invalid={invalid}
      label={label}
      maxItems={maxItems}
      message={message}
      name={name}
      options={processedOptions}
      placeholder={placeholder}
      required={required}
      size={size}
      value={value}
      picker={picker}
      showChevron={showChevron}
      checkedItems={checkedItems}
      editable={editable}
      clearable={clearable}
      handleClear={handleClear}
      onBlur={handleFocusAndBlur}
      onChange={onChange}
      onClick={handleClick}
      onFocus={handleFocusAndBlur}
      onOptionClick={handleOptionClick}
      onKeyUp={handleKeyDown}
      onCheckboxChange={handleCheckboxChange}
    />
  );
};

export { Select };
export type { ISelect, IOption };
