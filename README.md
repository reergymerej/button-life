## plugin interface

plugins must:

* provide a name
* provide button text
* provide logic to determine if it is enabled
* provide mutator for state when clicked
* provide an initial state


plugins can:

* augment other plugins' state mutators
* provide state visible to user (for showing how decisions are made)



```js
{
  name: 'accrue',
  text: 'Accrue Assets',
  enabled(state) { return true },
  getInitialState(state) { return {} },
  mutator(state) { return {} },
}
```
