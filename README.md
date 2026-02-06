# isettingkit

isettingkit is a modular UI toolkit designed to streamline the creation and management of business rule-driven interfaces. It offers a suite of reusable components, utilities, and type definitions to facilitate the development of dynamic, rule-based forms and configurations.

## 📁 Project Structure

The src directory is organized into the following primary modules:

### 1. businessRules

Contains components and utilities for managing business rules:

Cards/: Components like BusinessRuleCard for visual representation of individual rules.

Form/: Components such as RulesForm to create and edit business rules.

Modal/: Modal components for rule creation and editing workflows.

BusinessRuleView.tsx: A comprehensive view component to display business rules.

### 2. Filter

Provides components to filter and search through business rules:

FilterModal/: Modal components for applying filters.

FilterTag/: Tag components representing active filters.

FormFilter/: Form components to define filter criteria.

### 3. types

Defines TypeScript interfaces and types to ensure type safety across components:

businessRules/: Types related to business rule components.

Filter/: Types associated with filtering functionalities.

## 🚀 Getting Started

Installation
Install the package using npm:

```bash
npm install @isettingkit/business-rules
```

Usage
Import and use the components in your project:

```bash
import { BusinessRuleCard, RulesForm } from '@isettingkit/business-rules';
```

```tsx
function App() {
  return (
    <div>
      <BusinessRuleCard rule={ruleData} />
      <RulesForm onSubmit={handleSubmit} />
    </div>
  );
}
```

## Theming

isettingkit utilizes styled-components for styling. Ensure your application is wrapped with a ThemeProvider and the appropriate theme is provided.

## 📚 Documentation

Each component is fully typed with TypeScript. Refer to the types directory for detailed type definitions:

IBusinessRuleCard: Props for BusinessRuleCard component.

IRulesForm: Props for RulesForm component.

IFilterTag: Props for FilterTag component.

## 🛠 Development

To contribute or run the library locally:

Clone the repository:

```bash
git clone https://github.com/selsa-inube/isettingkit.git
```

Navigate to the project directory:

cd isettingkit

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run storybook
```

## 🧪 Testing

The project uses Storybook for component development and visualization. Run Storybook to view and test components in isolation..
