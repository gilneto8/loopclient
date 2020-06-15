# Loop

---

### Done

- [x] side navigator component
- [x] form structure could be saved on the marker/line, and then transformed in runtime to a form with react-hook-form
- [x] redux
- [x] remove forms from popups and only show info
- [x] put markers on reducer
- [x] visual indication that a marker is selected
- [x] change way some components connect to each other:
  - [x] SidenavBody should choose which form to pick by filtering props.item type
  - [x] Sidenav logic - should it update something on itself after a form submit? study
- [x] fix typings - lots of '| null' and '| undefined' around
- [x] delete markers
- [x] marker list on sidenav
- [x] colors should come from a single place, and not being calculated on each component - ui
- [x] on hover updates reducer
- [x] optimize color selection and logic (contexts)
- [x] concept of Trip
- [x] create forms on sidenav, while validating schema
  - should create generic components (label, input, select, etc.)
  - memoizing where possible
  - validation with yup

### To Do

#### Functionalities

- [ ] visual indication that changes were made
- [ ] marker info with X to close info and not close the sidenav
  - Submit does not close sidenav, just clears info
- [ ] dnd on marker list
- [ ] way of drawing itineraries (not just by placing markers?);
- [ ] marker clustering
  - consider `@urbica/react-map-gl` for OOTB marker clustering; possibly no typescript support.

#### Bugs

- [ ] handle warnings and a11y issues
- [ ] popup background color should fill popup container

#### Optimization

- [ ] separate into logic functions to unclutter component spec
- [ ] memoize static styles so they never reload
- [ ] check React Developer Tools and profiling tools

#### Other

- [ ] investigate if Web Components should be considered here
- [ ] get project build-ready
- [ ] write articles for the ongoing process

---

### Misc

- On memoizing:
  - [Difference between `React.memo` and `useMemo`](https://stackoverflow.com/questions/55466104/using-usememo-instead-of-react-memo-syntax-issue);
  - [Not using `lodash` memoization](https://dev.to/nioufe/you-should-not-use-lodash-for-memoization-3441);
  - [Using `useMemo` and `useContext` to minimize re-renders](https://github.com/facebook/react/issues/15156).
- On map libraries:
  - [Traveling Salesman problem solved with React](https://www.reddit.com/r/reactjs/comments/di9t67/i_made_an_interactive_solver_for_the_traveling/f3usd67/)
  - [React MapGL library](http://visgl.github.io/react-map-gl/)
  - [DeckGL library - visualization layer](https://deck.gl/#/)
- On creating a side navigation bar with React:
  - [Stack Overflow answer with detailed tutorial](https://stackoverflow.com/questions/39974486/accordion-sidebar-menu-using-nav-components-with-react-bootstrap)
- On map routing:
  - [MapBox OOTB routing system](https://docs.mapbox.com/api/navigation/)
  - [HERE API](https://developer.here.com/)
  - [YOURS API](https://wiki.openstreetmap.org/wiki/YOURS#API_users)
  - [Comparison between multiple routing services](https://wiki.openstreetmap.org/wiki/Routing/online_routers)
- On forms:
  - [Formik](https://jaredpalmer.com/formik/)
  - [React Hook Form](https://react-hook-form.com/get-started)
  - [RHF with Yup](https://codesandbox.io/s/928po918qr)
- On Gatsby templates:
  - [How they work (official documentation)](https://www.gatsbyjs.org/docs/building-with-components/#page-template-components)
- On color manipulation and conversion:
  - [Color scheme from base color](https://bgrins.github.io/TinyColor/)
- On performance:
  - [Five tools to optimizing performance](https://blog.bitsrc.io/5-recommended-tools-for-optimizing-performance-in-reactjs-29eb2a3ec46d)
    1. Profiler ([docs](https://reactjs.org/docs/profiler.html), [example](https://codesandbox.io/s/agitated-violet-ojlur))
    2. React Developer Tools ([docs](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en))
    3. Bit.dev ([docs](https://bit.dev/))
    4. why-did-you-render ([docs](https://github.com/welldone-software/why-did-you-render))
    5. Performance Timeline (from Chrome DevTools) 
