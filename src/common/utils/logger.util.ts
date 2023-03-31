import figlet from 'figlet';

export function logoShow() {
  // refer http://patorjk.com/software/taag/#p=testall&h=1&c=lua&f=AMC%20Tubes&t=zuelBookHelper
  return new Promise<void>((resolve, reject) => {
    figlet(
      process.env.APP_NAME,
      {
        font: 'Puffy',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        whitespaceBreak: false,
      },
      function (err, data) {
        if (err) {
          return;
        }
        resolve();
        console.log(data);
      },
    );
  });
}
