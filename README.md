# Window11 Desktop

a concrete and detailed window 11 gui implementation.

you can only conduct nice optimizations on complicated project because there is no necessity to do so in simple project. you have nothing to optimize when there are just several components and one data pipeline, to be honest.

this project is aiming at containing as many contents as possible to achieve a complicated state for me to use different strategies for optimizing and experiencing my thoughts in some cases.

# Preview

here: https://win11-desktop-virid.vercel.app/

# Tech Stack

- @mui/joy, @mui/icons-materials
- tailwindcss, styled-components
- vite, typescript, react
- rxjs

## why there are 3 css libs?

- time to try new technologies.
- styled-components has really solved some of my problems in dynamically controlling the components' style, with styled-components we don't need to switch between different `className` to show different style in different situations.

## what the most important part of this project?

- basically, the react components parts are quite ordinary, and I just have tried and experimented some of my thoughts in building better components in performance(showed as less frequently rerendered) and reusable aspect.
- the structure I put most attention to is the `context` part. I have designed a `RxStore` as a basic storage service for multiple kinds of controller which require a state storage.
- the `RxStore` is a mechanism which is quite similar with the core mechanism in Vue in my opinion. this means that the state stored in this `RxStore` has the capability to trigger a notification to whom is listening to it. this is very similar with what the Vue does by using `Proxy`, the `ref` variable is tracked by Vue and in our project the change of state value is also `subscribed` by us.
- by using `subscribe` we can be notified with the exact state value change which we care about. we will be notified only if the state we subscribe changed. this is the key to decrease the frequency of rerender of our components.
- btw, this `subscribe` capability is achieved by `RxJS.BehaviorSubject`

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

- conclusion: i will just make it possible first, and then make it better if i have any ideas on how to do so.
