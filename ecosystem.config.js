let sunucu = "Luhux"
module.exports = {
  apps: [
    {
      name: sunucu + "Mainframe",
      namespace: "luhuxbaba",
      script: 'main.js',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "2G",
      cwd: "./Bots/Main"
    }
  ]
};