### Ref

- Map Lib `https://www.reddit.com/r/reactjs/comments/di9t67/i_made_an_interactive_solver_for_the_traveling/f3usd67/`
  - `http://visgl.github.io/react-map-gl/`
  - `https://deck.gl/#/` ?
- Side navbar `https://stackoverflow.com/questions/39974486/accordion-sidebar-menu-using-nav-components-with-react-bootstrap`
- Routing
  - `https://docs.mapbox.com/api/navigation/`
  - `https://developer.here.com/`
  - `https://wiki.openstreetmap.org/wiki/YOURS#API_users`
  - `https://wiki.openstreetmap.org/wiki/Routing/online_routers`
- Forms
  - Formik
  - React Hook Form `https://react-hook-form.com/get-started`
    - w/ Yup `https://codesandbox.io/s/928po918qr`
- Gatsby Templates?
  - `https://www.gatsbyjs.org/docs/building-with-components/#page-template-components`
  
### Done 

- [x] side navigator component
- [x] form structure could be saved on the marker/line with the yup schema, and then transformed in runtime to a form with react-hook-form
  - `https://codesandbox.io/s/928po918qr`
  - initial information can come from `data`
- [x] redux
  - `store-types.ts` - all store types (reducers)
  - `create-store-manager.ts` - override to the pure `combineReducers` method, loads each async
  - `use-store-dispatch` - created hook to use for dispatching actions
  - `use-store-selector` - similar to `useSelector`, but async, within the async store manager
  - examples:
    - `users-thunks` - actions file
    - `users-reducer` - reducer file itself
- [x] remove forms from popups and only show info
- [x] put markers on reducer
- [x] visual indication that a marker is selected and that changes were made
- [x] change way some components connect to each other:
  - [x] SidenavBody should choose which form to pick by filtering props.item type
  - [x] Sidenav logic - should it update something on itself after a form submit? study
- [x] fix typings - lots of '| null' and '| undefined' around
- [x] delete markers
- [x] create marker list on sidenav
- [x] colors should come from a single place, and not being calculated on each component - ui
- [x] on hover updates reducer 


### To Do

#### Functionalities

- [ ] create forms on sidenav, while validating schema
  - should create generic components (label, input)
  - memoizing where possible
- [ ] marker info with X to close info and not close the sidenav
  - Submit does not close sidenav, just clears info
- [ ] dnd on marker list
- [ ] way of drawing itineraries (not just by placing markers?);

#### Bugs

#### Optimization

- [ ] optimize color selection and logic (contexts)
  - `https://kentcdodds.com/blog/how-to-optimize-your-context-value`
- [ ] separate into logic functions to unclutter component spec

#### Other

- [ ] write articles as tutorials?
  - must organize steps...
  
    
### Misc

```
Avoid component rendering - React.memo
Avoid re-computing internal component state - useMemo
Avoid re-computing information derived from the redux state - createSelector from reselect
```