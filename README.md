# 📦 isettingkit-business-rules: Business Rule Components Library

## Overview

The **`isettingkit-business-rules`** library is designed to handle business rules and decision-making in frontend applications. It includes a variety of components to display, modify, and manage business rules, decisions, and conditions. This documentation covers the core components, their functionality, and how to integrate them.

---

## 📚 Components

### 1. `getValueData`

#### Description
The `getValueData` function extracts and formats the value data from a decision or condition element.

#### Props
- **element** (`IRuleDecision["decision"] | ICondition | undefined`): The decision or condition element to extract the value from.

#### Usage Example
```tsx
const value = getValueData(decision.decision);
```

### 2. BusinessRuleView
#### Description
BusinessRuleView renders a detailed view of a business rule, displaying decisions and conditions, along with their corresponding values.

#### Props
- **decision** (IRuleDecision): The business rule decision data.
- **textValues** (IRulesFormTextValues): Text values for displaying labels and descriptions.
#### Usage Example
```tsx
<BusinessRuleView
  decision={ruleDecision}
  textValues={textValues}
/>
```

### 3. BusinessRuleCard
#### Description
BusinessRuleCard is a card component used to display a business rule with options to view or delete the rule.

#### Props
- **children** (React.ReactNode): The content of the card.
- **handleDelete** ((id: string) => void): Function to handle the deletion of a rule.
- **handleView** ((id: string) => void): Function to handle viewing a rule.
- **id (string)** : The ID of the business rule.
#### Usage Example
```tsx
<BusinessRuleCard
  id="rule1"
  handleDelete={deleteRule}
  handleView={viewRule}
/>
```
### 4. RulesForm
#### Description
RulesForm is a form component for handling and submitting business rule decisions. It integrates with Formik for form validation and submission.

#### Props
- **id** (string): The unique ID for the form.
- **decision** (IRuleDecision): The decision data for the form.
- **onCloseModal** (() => void): Function to handle closing the modal.
- **onCancel** (() => void): Function to handle cancelling the form.
- **onSubmitEvent** ((dataDecision: IRuleDecision) => void): Function to handle submitting the form data.
- **textValues** (IRulesFormTextValues): Text values for the form labels and descriptions.
#### Usage Example
```tsx
<RulesForm
  id="ruleForm1"
  decision={ruleDecision}
  onCloseModal={closeModal}
  onCancel={cancelForm}
  onSubmitEvent={submitDecision}
/>
```

### 5. ReasonForChange
#### Description
ReasonForChange is a component that renders a textarea input to capture the reason for a change in a business rule.

#### Props
- **label** (string): The label for the textarea.
- **labelText** (string): The label text to display.
- **onHandleChange** ((event: React.ChangeEvent<HTMLInputElement>) => void): Callback to handle textarea changes.
- **placeholder** (string): The placeholder text for the textarea.
- **required** (boolean): Indicates if the field is required.
- **value** (string?): The value of the textarea (optional).
#### Usage Example
```tsx
<ReasonForChange
  label="Change Reason"
  labelText="Reason for Change"
  onHandleChange={handleChange}
  placeholder="Enter reason for change"
  required={true}
/>
```

### 6. Term
#### Description
Term is a component used to handle the start and end dates of a business rule term. It allows for toggling between an open and closed term, and managing start and end dates.

#### Props
- **onHandleStartChange** ((event: React.ChangeEvent<HTMLInputElement>) => void): Callback to handle the change in start date.
- **onHandleEndChange** ((event: React.ChangeEvent<HTMLInputElement>) => void): Callback to handle the change in end date.
- **labelStart** (string): The label for the start date input.
- **labelEnd** (string): The label for the end date input.
- **checkedClosed** (boolean?): Whether the term is closed (optional).
- **required** (boolean?): Whether the fields are required (optional).
- **valueStart** (string?): The value for the start date (optional).
- **valueEnd** (string?): The value for the end date (optional).
#### Usage Example
```tsx
<Term
  labelStart="Start Date"
  labelEnd="End Date"
  onHandleStartChange={handleStartChange}
  onHandleEndChange={handleEndChange}
/>
```

### 7. ToggleOption
#### Description
ToggleOption is a component that renders a toggle switch and displays additional content when the toggle is checked.

#### Props
- **checked** (boolean): The current checked state of the toggle.
- **children** (React.ReactNode): The content to display when the toggle is checked.
- **handleToggleChange** ((e: React.ChangeEvent<HTMLInputElement>) => void): Callback to handle the toggle change event.
- **id** (string): The unique ID for the toggle.
- **labelToggle** (string): The label for the toggle.
- **name** (string): The name of the toggle input.
- **valueToggle** (string?): The value of the toggle input (optional).
#### Usage Example
```tsx
<ToggleOption
  checked={isChecked}
  handleToggleChange={handleToggleChange}
  id="toggleOption1"
  labelToggle="Enable Option"
  name="optionToggle"
/>
```

#### 🚀 How to Use
#### 1. Installation
Install the library using npm:

```bash
npm install isettingkit-business-rules
```
#### 2. Import Components
Once installed, you can import and use the components like this:

```tsx
import { BusinessRuleView, BusinessRuleCard, RulesForm, ReasonForChange, Term, ToggleOption } from 'isettingkit-business-rules';
```
#### 3. Storybook Integration
To visualize the components in action, we use Storybook. Storybook allows developers to interact with the components in isolation, view different states, and confirm that they behave as expected.

You can run Storybook for this library by navigating to the project folder and using the following command:

```bash
npm run storybook
```
#### 📦 Available Components
- **BusinessRuleView**: Displays a business rule's decision and conditions.
- **BusinessRuleCard**: Displays a business rule in a card format with options to view or delete.
- **RulesForm**: A form component for handling and submitting business rule decisions.
- **ReasonForChange**: A textarea input for capturing the reason for a change.
- **Term**: Manages the start and end dates for a business rule term.
- **ToggleOption**: A toggle switch component with additional content.
