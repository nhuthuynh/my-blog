This project is for learning and expirementing purposes

    16.8 react introduces react hooks
        - are javascript functions.
        - allow us to use state and other react features without implementing class.
        - is function let dev hook into React state and lifecycle features from function components.
        - wont work inside class style component.
        - only called at top level, dont call hooks inside loops, conditions, or nested functions
        - only call hooks from React function  components and custom hooks.
        1. useState 
            -   is a hook, called in side functional component to use local state
            -   return a pair value, the current state value and function to update state value
            -   argument of this function is initial state value, value can be any types, 
                    only being used at first render
            -   can use multiple state hooks in single component
            -   array destructuring syntax is used to name different state with different name
        2. useEffect 
            -   is a hook, used to perform data fetching, subscriptions, or manually change DOM from 
                React components, these operations are called side effects   
            -   has same purpose as componentDidMount, componentDidUpdate, componentWillUnmount in React classes
            -   will receive a function as argument and the function will be call when component's 
              componentDidMount, componentDidUpdate, is called
            -   the argument function could return another function which could be called when 
               component's componentWillUnmount is called
            -   if the value is passed to the returned function of the argument function do not change, 
               React will skip calling the function.
        3. custom hook
            -   
        4. useContext
           -
        5. useReducer
           -
 