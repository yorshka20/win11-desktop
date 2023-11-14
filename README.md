# Window11 Desktop

a concrete and detailed window 11 gui implementation. i will try to implement as many functions as possible.

this project is aiming at containing plenty of contents to achieve a complicated state for me to use different strategies for optimizing and experimenting my thoughts in some cases.

you can only perform nice optimizations on complicated project because there is no necessity to do so in simple project. you have nothing to optimize when there are just several components and one data pipeline, to be honest.

# Preview

here: https://win11-desktop-virid.vercel.app/

# Tech Stack

- @mui/joy, @mui/icons-materials
- tailwindcss, styled-components
- vite, typescript, react
- rxjs
- codeium: a copilot tool. it helps a lot in shipping the code.

# Thoughts

## initial plan

there are at least two stages of development:

1. UI components stage
2. Overall software engineering stage

for the ui stage, there are not many new things applied into the coding, and everything is just common react component. when it comes to the second stage, i think there will be more considerations on how to make code more concise and abstracted to decrease the size and enrich the utilities at the same time.

currently i am just writing the react components and some basic models for state management. it looks very `simple and crude`.

overall, it's an _useless_ project which can do nothing but only display the interface. so it will be hard to make this project better in the perspective of software engineering.

## why there are 3 css libs?

- time to try new technologies. but just try.
- styled-components has really solved some of my problems in dynamically controlling the components' style, with styled-components we don't need to switch between different `className` to show different style in different situations.
- actually i don't like the css-in-js strategy because some of these has a runtime cost and will take more space in your bundle files.

## what the most important part of this project?

- basically, the react components parts are quite ordinary, and I just have tried and experimented some of my thoughts in building better components in performance(showed as less frequently rerendered) and reusable aspect.
- the structure I put most attention to is the `context` part. I have designed a `RxStore` as a basic storage service for multiple kinds of controller which require a state storage.
- the `RxStore` is a mechanism which is quite similar with the core mechanism in Vue in my opinion. this means that the state stored in this `RxStore` has the capability to trigger a notification to whom is listening to it. this is very similar with what the Vue does by using `Proxy`, the `ref` variable is tracked by Vue and in our project the change of state value is also `subscribed` by us.
- by using `subscribe` we can be notified with the exact state value change which we care about. we will be notified only if the state we subscribe changed. this is the key to decrease the frequency of rerender of our components.
- btw, this `subscribe` capability is achieved by `RxJS.BehaviorSubject`

# Schedule

i am going to implement 3 kinds of `Window` in this project.

- Explorer
- Setting
- Image

## Window Component

### Setting Window

- [x] framework

### Explorer Window

- [x] framework

### Image Window

- [x] framework

## TODO

- detailed components in different `Window`
- an overall state controller of a complicated system, just like the windows 11
- maybe some 'useful' apps like `notepad` and `draw`
- add test cover.

# Problems and thoughts in development

## can we use `contextHook` in components?

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

## we should organize and separate the operations on `store` and `windowManager` and `components`

- we don't operate `store` in components part, instead we use `dispatcher` to trigger the operations of store.
- we don't operate `components` in `context` part, instead we use a `proxyOperation` to do the tasks in component modules.
- _TODO_: currently it's just a mass. optimizations are needed.
