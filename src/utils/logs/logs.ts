// export const debugLogs = (info: string) => {
//   if (__DEV__) {
//     console.log(
//       '======================================================================================',
//     );
//     console.log(`${info}`);
//     console.log(
//       '======================================================================================',
//     );
//   }
// };

export const debugLogs = (
  info: string,
  logParams?: string | number | object | boolean,
) => {
  if (__DEV__) {
    console.log(
      '======================================================================================',
    );
    console.log(`${info} :===> \n`);
    if (logParams) {
      console.log(logParams);
      // console.log("DATA")
    }
    console.log(
      '======================================================================================',
    );
  }
};
