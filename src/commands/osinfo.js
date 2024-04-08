import os from 'os';

export const performOsInfo = async (args) => {
  if (args.length !== 1) {
    console.log('Invalid input. Usage: os --EOL, os --cpus, os --homedir, os --username, os --architecture');
    return;
  }

  switch (args[0]) {
    case '--EOL':
      console.log(JSON.stringify(os.EOL));
      break;
    case '--cpus':
      const cpus = os.cpus();
      console.log(`Total CPUs: ${cpus.length}`);
      cpus.forEach((cpu, index) => {
        console.log(`CPU ${index}: ${cpu.model} at ${cpu.speed}MHz`);
      });
      break;
    case '--homedir':
      console.log(os.homedir());
      break;
    case '--username':
      console.log(os.userInfo().username);
      break;
    case '--architecture':
      console.log(os.arch());
      break;
    default:
      console.log('Invalid argument. Use one of --EOL, --cpus, --homedir, --username, --architecture');
  }
};