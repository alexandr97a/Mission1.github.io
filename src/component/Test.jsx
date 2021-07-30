// import React, { Component, Fragment } from "react";
// import { createTheme, ThemeProvider } from '@material-ui/core/styles';
// import { Box } from '@material-ui/core';


// const theme = createTheme({
//   breakpoints: {
//     values: {
//       sm: 480,
//       md: 768,
//       lg: 999,
//     },
//   },
// })

// // interface Props{
// //   children: React.ReactNode;
// //   breakpoint:string;
// // }

// //  function DisplaBox({children,breakpoint}: Props){
// //    const display= {
// //     sm: 'none',
// //     md: 'none',
// //     lg: 'none',
// //    };
// //    display[breakpoint] = 'block';
// //    return <Box display={display}>{breakpoint}</Box>
// //  }

// class Test extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//     }
//   };

  
//   render() {
//     const breakpoints = ['sm', 'md', 'lg']
//     return(
//       <Fragment className='App'>
//         <ThemeProvider theme={theme}><Box display="flex" justifyContent='center' alignItems="center" width="100vw" height="100vh" fontSize="100px">
//         {breakpoints.map((breakpoint) => (<DisplaBox breakpoint={breakpoint}></DisplaBox>))}
//         </Box></ThemeProvider>
//       </Fragment> 
//     )
//   };
// };


// export default Test;