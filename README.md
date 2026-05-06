# Kevin's Design System

Instead of continually building the same components for each project, I've created a design system that I can use across my projects.

It is intended to be minimal, extensible, and unopinionated, heavily inspired by Tailwind components.

Built with React, Tailwind CSS, Headless UI, and Storybook.

## Installation

```bash
npm install kdesign
```

## Usage

Import the components and styles into your project.

```tsx
import { Button, Input } from "kdesign";
import "kdesign/styles.css";

<Button>Click me</Button>
<Input placeholder="Enter your name" />
```
