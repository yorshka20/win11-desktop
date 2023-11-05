# Window11 Desktop

a concrete and detailed window 11 gui implementation. just want to write some code to make use of difference designs and techs in project.

you can only conduct nice optimizations on complicated project because there is no necessity to do so in simple project. you have nothing to optimize, to be honest.

do this project is aiming at containing as many contents as possible to achieve a complicated state for me to use difference strategies for optimizing.

# Preview

here: https://win11-desktop-virid.vercel.app/

# Tech Stack

- @mui/joy, @mui/icons-materials
- tailwindcss, styled-components
- vite, typescript, react
- rxjs

## why there are 3 css libs?

- time to try new technologies.

# Plan

things will be built from Window.

first we write some window components, and then add difference ui and interactions to window components.

currently only 4 kinds of window are planned to be implemented.

## Window Component

### Setting Window

- [x] framework

### Explorer Window

- [x] framework

### Image Window

### Video Window

# Problems

## can we use contextHook in components?

- i want to pass less props to component
- there should be some difference between `Basic Component` and `Business Component`
- what is `Basic Component` and `Business Component`?
  - Basic Component: reusable component with pure ui
  - Business Component: components fulfilled with actual logic for difference usage.
- i didn't differ basic components and business components in this project.

## how to write less code?

- better abstraction. no exception.

## a correct way to communicate with different modules in this project.

- context: we put `windowManager` and `dispatcher` and `eventPipe` in context. we should only access context under react components.
- store: a state store representing the states of application.

it's not correct to access modules in inappropriate level, in which case we may need a proxy to do something for us. like:

- a proxy in component container that listening to `pipeEvent` and mount some components in purpose.
- a proxy in component container that subscribes to the state or `pipeEvent` and do some business in component domains which can't be done in common module functions.
- to be continue.
