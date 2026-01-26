# TODO List for Fixing Home Page Loading Issue

## Information Gathered
- `App.jsx` defines its own routes directly, including a route for "/" that renders `<Home />` from `src/pages/Home.jsx`.
- `AppRoutes.jsx` has a redirect from "/" to "/home" and renders `<Home />` from `src/components/Home.jsx`.
- There are two `Home` components: one in `src/pages/Home.jsx` (which is actually a Register component) and one in `src/components/Home.jsx`.
- The app is not using `AppRoutes.jsx` in `App.jsx`, leading to conflicting routing.

## Plan
- Update `App.jsx` to use `AppRoutes.jsx` instead of defining its own routes.
- Ensure the correct `Home` component is used (likely `src/components/Home.jsx` for the home page).
- Remove or rename the incorrect `Home.jsx` in `src/pages/` if it's not needed.

## Dependent Files to be Edited
- `src/App.jsx`: Replace direct route definitions with `AppRoutes.jsx`.
- `src/routes/AppRoutes.jsx`: Ensure it imports the correct `Home` component.

## Followup Steps
- Test the app to confirm the home page loads first on "/".
- Check for any broken links or components after changes.
