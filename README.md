# Button Life


This is kind of a joke, but it turned into a cool architecture challenge.  Lots
of games boil down to basically these three things:

1. You have assets.
2. You accrue assets.
3. You increase the accretion rate.

I thought it would be a good idea to strip away the silliness and just have
these options.  My wife wasn't as excited and we joked that we could expand the
game and have all sorts of buttons you press.

And here we are.

That example can actually be stripped down a bit more.

1. You have assets.

That's the kernel of the game.  It sucks.  But this is an architecture challenge
that allows for expansion.

![demo](https://user-images.githubusercontent.com/1720010/51041089-1d6d9580-1587-11e9-9b35-1e8412a1e6e2.gif)


## plugin interface

plugins must:

* provide a name
* provide button text
* provide logic to determine if it is enabled
* provide mutator for state when clicked
* provide an initial state


plugins can:

* make parts of state visible to user (for showing how decisions are made)
* augment other plugins'
  * state mutators
  * enabled state


runtime:

* can add plugins
* can remove plugins



## TODO

* Make add/remove plugins a plugin
* Allow for dynamic button text
* Move side effects out of reducers (random events) - They are not replayable
  like this.
* When removing a plugin, remove its parts of state.
