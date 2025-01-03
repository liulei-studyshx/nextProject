// git-automation.js
const { exec } = require('child_process');
const readline = require('readline');

// 创建接口，用于接收用户输入
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 提示用户输入 commit message
rl.question('Enter your commit message: ', (message) => {
  if (!message) {
    console.error('Commit message cannot be empty!');
    rl.close();
    process.exit(1);
  }

  console.log('Running git commands...');

  // 执行 git 命令
  exec('git add .', (err) => {
    if (err) {
      console.error(`Error adding files: ${err.message}`);
      rl.close();
      return;
    }

    exec(`git commit -m "${message}"`, (err) => {
      if (err) {
        console.error(`Error committing: ${err.message}`);
        rl.close();
        return;
      }

      exec('git push', (err) => {
        if (err) {
          console.error(`Error pushing to repository: ${err.message}`);
          rl.close();
          return;
        }

        console.log('Successfully pushed to the repository!');
        rl.close();
      });
    });
  });
});
