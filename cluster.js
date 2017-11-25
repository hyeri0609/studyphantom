const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

//.log("numCPUSs: " + numCPUs);

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  
  cluster.setupMaster({
    exec: 'server.js'
  });

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log('worker %d died (%s).', worker.process.pid, signal || code);
    
    console.log('forking...');
    cluster.fork();
    console.log('forked...');
    
    var countWorker = 0;
    for (const id in cluster.workers) {
      countWorker++;
      // var worker = cluster.workers[id];
      // console.log("worker.id: " + worker.id);
    }
    console.log("count workers: " + countWorker)
  });
} else {



  console.log(`Worker ${process.pid} started`);
}



