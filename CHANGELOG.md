# amaribot.js

## 2.1.0

### Minor Changes

-   a426d64: Add customFetch to the options when creating a new client, allowing you the ability to write custom fetch functions

## 2.0.4

### Patch Changes

-   ab8f2f6: Revert node-fetch to v2 for cjs compatibility

## 2.0.3

### Patch Changes

-   Bump version of node-fetch
-   Fix bug in getCombinedLeaderboard that caused weekly XP data to be incorrect

## 2.0.2

### Patch Changes

-   Support both commonjs and modern es6

## 2.0.1

### Patch Changes

-   Fix a bad import path

## 2.0.0

### Major Changes

-   0b3da13: This major update is a **breaking change**!

    # Major Changes

    -   Rewrote the library to Typescript
    -   Changed getGuildLeaderboard to getLeaderboard
    -   Changed getRawGuildLeaderboard to getRawLeaderboard
    -   Added a getCombinedLeaderboard method
    -   Changed getLevelExp to getNextLevelExp
    -   Updated the documentation website
    -   Updated many object's keys to match the internal API keys
    -   Renamed the original APIError to AmariError (and added a new type called APIError for error typing from the API itself)

    [See the full changes here.](https://github.com/amaribot/amaribot.js/compare/v1.6.1...v2.0.0)
