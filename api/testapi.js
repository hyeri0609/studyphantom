'use strict';
module.exports = function(router) {
  //var todoList = require('../controllers/todoListController');

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
    router.get('/x', function(req, res) {
        res.json({ message: 'hooray! welcome to our apix!' });   
    });

    router.route('/textformat').post(function(req, res) {
      console.log(req.body.data);
      res.json({ message: 'hooray! welcome to our api!' }); 
    });

    router.route('/user').get(function(req, res) {
      res.json({ message: 'user' }); 
    });
    
//   app.route('/tasks')
//     .get(todoList.list_all_tasks)
//     .post(todoList.create_a_task);


//   app.route('/tasks/:taskId')
//     .get(todoList.read_a_task)
//     .put(todoList.update_a_task)
//     .delete(todoList.delete_a_task);

};
