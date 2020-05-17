# Managing state and server communication with VUEX

## Vuex Store:

Allows an interface for mutating data, requesting async mutations and management of complex logic of computed logic with getters, it ensures a shared data store for your application that. Vuex is really helpful in cases when you want to hold and manage global state, like a cart in a shopping application.


Vuex Store it's composed of this 4 elements:

- **State**: At the heart of Vuex Store is the shared state tree. Works well with change detection. 

- **Mutations**: Are sync functions and works directly on state. All changes to data on a store must happen through mutations

- **Actions**: Are async functions used for cases when you have, for example, to fetch data from a server.

- **Getters**: Globally available functions that retrieve data and perform some kind of calculation on it before returning it.

